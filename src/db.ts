import Dexie, { Table } from 'dexie'

import { Material, Recipe } from './components/types'

export type RecipeTable = Omit<Recipe, 'materials'> & {
  materialIds: { id: number; qty: number }[]
  id?: number
}
export type MaterialTable = Omit<Material, 'recipe'> & {
  recipeId?: number
  id?: number
}

export class TempTeamcraftDexie extends Dexie {
  recipes!: Table<RecipeTable>
  materials!: Table<MaterialTable>

  constructor() {
    super('temp-teamcraft')
    this.version(1).stores({
      materials: '++id, name, job, location, time, recipeId',
      recipes: '++id, name, materialIds',
    })
  }
}

export const db = new TempTeamcraftDexie()
