import { useLiveQuery } from 'dexie-react-hooks'
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { getMaterials, getRecipes } from './utils'
import { EditMaterialModal } from '../components/Modals/MaterialCreator/EditMaterialModal'
import { EditRecipeModal } from '../components/Modals/RecipeCreator/EditRecipeModal'
import { Material, Recipe } from '../components/types'
import { namesEqual } from '../components/utils'
import { db } from '../db'

type RecipeContextValues = {
  recipes: Recipe[]
  materials: Material[]
  addNewMaterial: (material: Material, recipeId?: number) => Promise<void>
  addNewRecipe: (recipe: Recipe) => Promise<any>
  recipeToEdit: Recipe | undefined
  setRecipeToEdit: (recipe: Recipe) => void
  materialToEdit: Material | undefined
  setMaterialToEdit: (material: Material) => void
  updateRecipe: (oldRecipe: Recipe, recipe: Recipe) => Promise<number | void>
  updateMaterial: (
    oldMaterial: Material,
    material: Material
  ) => Promise<number | void>
  deleteItem: (name: string) => Promise<void>
}

export const RecipeContext = React.createContext<RecipeContextValues>({
  addNewMaterial: async () => {},
  addNewRecipe: async () => {},
  deleteItem: async () => {},
  materialToEdit: undefined,
  materials: [],
  recipeToEdit: undefined,
  recipes: [],
  setMaterialToEdit: () => {},
  setRecipeToEdit: () => {},
  updateMaterial: async () => 0,
  updateRecipe: async () => 0,
})

export function useRecipeContext() {
  const context = useContext(RecipeContext)
  if (!context) {
    throw new Error('useRecipeContext used outside of provider')
  }
  return context
}

export function RecipeContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const liveRecipes = useLiveQuery(() => db.recipes)
  const liveMaterials = useLiveQuery(() => db.materials)
  const liveMaterialArray = useLiveQuery(() => db.materials.toArray())
  const liveRecipeArray = useLiveQuery(() => db.recipes.toArray())

  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [materials, setMaterials] = useState<Material[]>([])

  const [recipeToEdit, setRecipeToEdit] = useState<Recipe>()
  const [materialToEdit, setMaterialToEdit] = useState<Material>()

  const addNewMaterial = useCallback(
    async (material: Material, recipeId?: number) => {
      if (!liveMaterials || !liveRecipes) return

      liveMaterials.add({
        job: material.job,
        location: material.location,
        name: material.name,
        recipeId,
        time: material.time,
      })
    },
    [liveMaterials, liveRecipes]
  )

  const getMaterialIdsForRecipe = useCallback(
    (recipe: Recipe) => {
      const materialIds: { id: number; qty: number }[] = []
      recipe.materials.forEach(material => {
        const foundMat = liveMaterialArray?.find(namesEqual(material))
        if (foundMat && foundMat.id) {
          materialIds.push({ id: foundMat.id, qty: material.qty })
        }
      })
      return materialIds
    },
    [liveMaterialArray]
  )

  const addNewRecipe = useCallback(
    async (recipe: Recipe) => {
      if (!liveRecipes) return
      const materialIds = getMaterialIdsForRecipe(recipe)
      const id = await liveRecipes.add({
        job: recipe.job,
        materialIds,
        name: recipe.name,
      })
      return id
    },
    [getMaterialIdsForRecipe, liveRecipes]
  )

  const updateRecipe = useCallback(
    async (oldRecipe: Recipe, recipe: Recipe) => {
      if (!liveRecipes || !liveRecipeArray) return
      let { id } = recipe
      if (!id) {
        const lRecipe = liveRecipeArray?.find(namesEqual(oldRecipe))
        if (!lRecipe || !lRecipe.id) return
        id = lRecipe.id
      }
      const materialIds = getMaterialIdsForRecipe(recipe)
      const index = liveRecipes?.update(id, {
        job: recipe.job,
        materialIds,
        name: recipe.name,
      })
      return index
    },
    [getMaterialIdsForRecipe, liveRecipeArray, liveRecipes]
  )

  const updateMaterial = useCallback(
    async (oldMaterial: Material, material: Material) => {
      if (!liveMaterials || !liveMaterialArray) return
      let { id } = material
      if (!id) {
        const lMaterial = liveMaterialArray.find(namesEqual(oldMaterial))
        if (!lMaterial || !lMaterial.id) return
        id = lMaterial.id
      }
      const index = await liveMaterials.update(id, material)
      return index
    },
    [liveMaterialArray, liveMaterials]
  )

  const deleteItem = useCallback(
    async (name: string) => {
      const recipe = liveRecipeArray?.find(namesEqual({ name }))
      const material = liveMaterialArray?.find(namesEqual({ name }))
      if (recipe) {
        liveRecipes?.delete(recipe.id as number)
      }
      if (material) {
        liveMaterials?.delete(material.id as number)
        const recipesContainingMaterial = liveRecipeArray?.filter(rec =>
          rec.materialIds.find(id => id.id === material.id)
        )
        if (recipesContainingMaterial?.length) {
          recipesContainingMaterial.forEach(rec => {
            deleteItem(rec.name)
          })
        }
      }
    },
    [liveMaterialArray, liveMaterials, liveRecipeArray, liveRecipes]
  )

  useEffect(() => {
    if (liveRecipes && liveMaterials && liveRecipeArray && liveMaterialArray) {
      getRecipes(liveRecipeArray, liveMaterials).then(result => {
        setRecipes(result)
      })
      getMaterials(liveRecipes, liveMaterials).then(result => {
        setMaterials(result)
      })
    }
  }, [liveRecipes, liveMaterials, liveRecipeArray, liveMaterialArray])

  const value = useMemo(
    () => ({
      addNewMaterial,
      addNewRecipe,
      deleteItem,
      materialToEdit,
      materials,
      recipeToEdit,
      recipes,
      setMaterialToEdit,
      setRecipeToEdit,
      updateMaterial,
      updateRecipe,
    }),
    [
      addNewMaterial,
      addNewRecipe,
      deleteItem,
      materialToEdit,
      materials,
      recipeToEdit,
      recipes,
      updateMaterial,
      updateRecipe,
    ]
  )

  return (
    <RecipeContext.Provider value={value}>
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
  )
}
