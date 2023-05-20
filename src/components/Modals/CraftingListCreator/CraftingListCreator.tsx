import { Button } from "@mui/material";
import { RecipeSelector } from "../../shared/RecipeSelector";
import { useMemo, useState } from "react";
import { Material, Recipe, Quantified } from "../../types";
import { useRecipeContext } from "../../../context/RecipeContext";
import { getMaterialsForRecipe } from "./utils";
import { QuantifiedList } from "../../Views/Quantified/QuantifiedList";
import { convertToNumber, namesEqual, namesInequal } from "../../utils";

import { Modal } from "../ModalBody";
import { CraftingListView } from "../../Views/CraftingList/CraftingListView";

function sortMaterialsByTime(
  materialList: Record<string, Quantified<Material>>
) {
  return Object.values(materialList).sort((a, b) => {
    if (!a.item.time) {
      return -1;
    }
    if (b.item.time) {
      return 1;
    }
    return parseInt(a.item.time) - parseInt(b.item.time);
  });
}

export function CraftingListCreator({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [craftingList, setCraftingList] = useState<Quantified<Recipe>[]>([]);
  const [materials, setMaterials] = useState<Quantified<Material>[]>([]);

  const { recipes } = useRecipeContext();

  const onCraftClick = () => {
    const materialList = getMaterialsForRecipe(craftingList, recipes);

    setMaterials(sortMaterialsByTime(materialList));
    setCraftingList([]);
  };

  const onAddRecipe = (recipe: Recipe) => {
    setCraftingList([...craftingList, { item: recipe, qty: 1 }]);
  };

  const onQtyChange = (recipe: Recipe, qty: string) => {
    let numQty = convertToNumber(qty);
    const newMaterials = craftingList.filter(namesInequal(recipe));
    newMaterials.push({ item: recipe, qty: numQty });
    setCraftingList(newMaterials);
  };

  const onDeleteRecipe = (recipe: Recipe) => {
    setCraftingList(craftingList.filter(namesInequal(recipe)));
  };

  const filteredRecipes = useMemo(() => {
    return recipes.filter((rec) => !craftingList.find(namesEqual(rec)));
  }, [craftingList, recipes]);

  return (
    <Modal open={isOpen} onClose={onClose} label="Create Crafting List" wide>
      <RecipeSelector
        onAddRecipe={onAddRecipe}
        shouldResetOnSelect
        recipes={filteredRecipes}
      />
      <QuantifiedList
        items={craftingList}
        onQtyChange={onQtyChange}
        onDelete={onDeleteRecipe}
      />
      <Button onClick={onCraftClick}>Craft!</Button>
      <CraftingListView craftingList={materials} />
    </Modal>
  );
}
