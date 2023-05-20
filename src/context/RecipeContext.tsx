import React, { useContext, useEffect, useState } from "react";
import { Material, Recipe } from "../components/types";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db";
import { getMaterials, getRecipes } from "./utils";
import { EditRecipeModal } from "../components/Modals/RecipeCreator/EditRecipeModal";
import { EditMaterialModal } from "../components/Modals/MaterialCreator/EditMaterialModal";
import { namesEqual } from "../components/utils";

type RecipeContextValues = {
  recipes: Recipe[];
  materials: Material[];
  addNewMaterial: (material: Material, recipeId?: number) => Promise<void>;
  addNewRecipe: (recipe: Recipe) => Promise<any>;
  recipeToEdit: Recipe | undefined;
  setRecipeToEdit: (recipe: Recipe) => void;
  materialToEdit: Material | undefined;
  setMaterialToEdit: (material: Material) => void;
  updateRecipe: (oldRecipe: Recipe, recipe: Recipe) => Promise<number | void>;
  updateMaterial: (
    oldMaterial: Material,
    material: Material
  ) => Promise<number | void>;
  deleteItem: (name: string) => Promise<void>;
};

export const RecipeContext = React.createContext<RecipeContextValues>({
  recipes: [],
  materials: [],
  addNewMaterial: async () => {},
  addNewRecipe: async () => {},
  recipeToEdit: undefined,
  setRecipeToEdit: () => {},
  materialToEdit: undefined,
  setMaterialToEdit: () => {},
  updateRecipe: async () => 0,
  updateMaterial: async () => 0,
  deleteItem: async () => {},
});

export function useRecipeContext() {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error("useRecipeContext used outside of provider");
  }
  return context;
}

export function RecipeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const liveRecipes = useLiveQuery(() => db.recipes);
  const liveMaterials = useLiveQuery(() => db.materials);
  const liveMaterialArray = useLiveQuery(() => db.materials.toArray());
  const liveRecipeArray = useLiveQuery(() => db.recipes.toArray());

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);

  const [recipeToEdit, setRecipeToEdit] = useState<Recipe>();
  const [materialToEdit, setMaterialToEdit] = useState<Material>();

  const addNewMaterial = async (material: Material, recipeId?: number) => {
    if (!liveMaterials || !liveRecipes) return;

    liveMaterials.add({
      name: material.name,
      job: material.job,
      location: material.location,
      time: material.time,
      recipeId,
    });
  };

  const getMaterialIdsForRecipe = (recipe: Recipe) => {
    const materialIds: { id: number; qty: number }[] = [];
    recipe.materials.forEach((material) => {
      const foundMat = liveMaterialArray?.find(namesEqual(material));
      if (foundMat && foundMat.id) {
        materialIds.push({ id: foundMat.id, qty: material.qty });
      }
    });
    return materialIds;
  };

  const addNewRecipe = async (recipe: Recipe) => {
    if (!liveRecipes) return;
    const materialIds = getMaterialIdsForRecipe(recipe);
    const id = await liveRecipes.add({
      name: recipe.name,
      job: recipe.job,
      materialIds,
    });
    return id;
  };

  const updateRecipe = async (oldRecipe: Recipe, recipe: Recipe) => {
    if (!liveRecipes || !liveRecipeArray) return;
    let { id } = recipe;
    if (!id) {
      const lRecipe = liveRecipeArray?.find(namesEqual(oldRecipe));
      if (!lRecipe || !lRecipe.id) return;
      id = lRecipe.id;
    }
    const materialIds = getMaterialIdsForRecipe(recipe);
    const index = liveRecipes?.update(id, {
      name: recipe.name,
      job: recipe.job,
      materialIds,
    });
    return index;
  };

  const updateMaterial = async (oldMaterial: Material, material: Material) => {
    if (!liveMaterials || !liveMaterialArray) return;
    let { id } = material;
    if (!id) {
      const lMaterial = liveMaterialArray.find(namesEqual(oldMaterial));
      if (!lMaterial || !lMaterial.id) return;
      id = lMaterial.id;
    }
    const index = await liveMaterials.update(id, material);
    return index;
  };

  const deleteItem = async (name: string) => {
    const recipe = liveRecipeArray?.find(namesEqual({ name }));
    const material = liveMaterialArray?.find(namesEqual({ name }));
    if (recipe) {
      liveRecipes?.delete(recipe.id as number);
    }
    if (material) {
      liveMaterials?.delete(material.id as number);
      const recipesContainingMaterial = liveRecipeArray?.filter((rec) =>
        rec.materialIds.find((id) => id.id === material.id)
      );
      if (recipesContainingMaterial?.length) {
        recipesContainingMaterial.forEach((rec) => {
          deleteItem(rec.name);
        });
      }
    }
  };

  useEffect(() => {
    if (liveRecipes && liveMaterials && liveRecipeArray && liveMaterialArray) {
      getRecipes(liveRecipeArray, liveMaterials).then((result) => {
        setRecipes(result);
      });
      getMaterials(liveRecipes, liveMaterials, liveMaterialArray).then(
        (result) => {
          setMaterials(result);
        }
      );
    }
  }, [liveRecipes, liveMaterials, liveRecipeArray, liveMaterialArray]);

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        materials,
        addNewMaterial,
        addNewRecipe,
        recipeToEdit,
        setRecipeToEdit,
        materialToEdit,
        setMaterialToEdit,
        updateRecipe,
        updateMaterial,
        deleteItem,
      }}
    >
      <EditRecipeModal
        isOpen={recipeToEdit !== undefined}
        onClose={() => setRecipeToEdit(undefined)}
      />
      <EditMaterialModal
        isOpen={materialToEdit !== undefined}
        onClose={() => setMaterialToEdit(undefined)}
      />
      {children}
    </RecipeContext.Provider>
  );
}
