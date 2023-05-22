import { Material, Quantified, Recipe } from '../../types'

const flattenMaterialListFromRecipeList = (recipes: Recipe[]) => {
  let materialList: Quantified<Material>[] = []
  recipes.forEach(recipe => {
    materialList = [...materialList, ...recipe.materials]
  })
  return materialList
}

export const getMaterialsForRecipe = (
  recipies: Quantified<Recipe>[],
  globalRecipeList: Recipe[],
  materials: Record<string, Quantified<Material>> = {}
) => {
  const precrafts: Quantified<Recipe>[] = []
  let rawMaterials = { ...materials }
  let newRecipes: Recipe[] = []
  recipies.forEach(qRecipe => {
    const filled = new Array(qRecipe.qty).fill(qRecipe.item)
    newRecipes = newRecipes.concat(filled)
  }, [])
  const flattenedMaterialList = flattenMaterialListFromRecipeList(newRecipes)

  flattenedMaterialList.forEach(material => {
    if (material.item.recipeId) {
      const precraftRecipe = globalRecipeList.find(
        pcRecipe => pcRecipe.id === material.item.recipeId
      )
      if (precraftRecipe)
        precrafts.push({ item: precraftRecipe, qty: material.qty })
    } else {
      const exists = rawMaterials[material.item.name] ?? {
        material: material.item,
        qty: 0,
      }
      rawMaterials[material.item.name] = {
        item: material.item,
        qty: exists.qty + material.qty,
      }
    }
  })

  if (precrafts.length) {
    rawMaterials = getMaterialsForRecipe(
      precrafts,
      globalRecipeList,
      rawMaterials
    )
  }
  return rawMaterials
}
