import { Table } from 'dexie'

import { Recipe } from '../components/types'
import { MaterialTable, RecipeTable } from '../db'

export async function getRecipes(
  recipeTable: RecipeTable[],
  materialTable: Table<MaterialTable>
) {
  const rArray = recipeTable
  const ret = rArray.map(recipe => {
    const newRecipe: Recipe = {
      id: recipe.id,
      job: recipe.job,
      materials: [],
      name: recipe.name,
    }
    recipe.materialIds.forEach(async id => {
      const material = await materialTable.get(id.id)
      if (material) {
        newRecipe.materials.push({ item: material, qty: id.qty })
      }
    })
    return newRecipe
  })
  return ret
}

export async function getMaterialsForRecipe(
  recipe: RecipeTable,
  materialTable: Table<MaterialTable>
) {
  const newRecipe: Recipe = {
    job: recipe.job,
    materials: [],
    name: recipe.name,
  }
  await recipe.materialIds.forEach(async id => {
    const material = await materialTable.get(id.id)
    if (material) {
      newRecipe.materials.push({ item: material, qty: id.qty })
    }
  })
  return newRecipe
}

export async function getMaterials(
  recipeTable: Table<RecipeTable>,
  materialTable: Table<MaterialTable>
) {
  const mArray = await materialTable.toArray()
  const promises = mArray.map(async material => {
    const { recipeId, ...newMaterial } = material
    let recipe: Recipe | undefined
    if (recipeId) {
      const tempRecipe = await recipeTable.get(recipeId)
      if (tempRecipe) {
        const newRecipe = await getMaterialsForRecipe(tempRecipe, materialTable)
        recipe = newRecipe
      }
    }
    return {
      ...newMaterial,
      recipe,
    }
  })
  const ret = await Promise.all(promises)
  return ret
}
