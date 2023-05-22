import { SelectChangeEvent } from '@mui/material'
import { useMemo, useState } from 'react'

import { useRecipeContext } from '../../context/RecipeContext'
import { Select } from '../Select/Select'
import { Recipe } from '../types'
import { namesEqual } from '../utils'

export function RecipeSelector({
  onAddRecipe,
  recipes,
  shouldResetOnSelect,
}: {
  onAddRecipe: (recipe: Recipe) => void
  shouldResetOnSelect?: boolean
  recipes: Recipe[]
}) {
  const [selectValue, setSelectValue] = useState('')
  const { recipes: globalRecipes } = useRecipeContext()

  const onChange = ({ target }: SelectChangeEvent<string>) => {
    const recipe = globalRecipes.find(namesEqual({ name: target.value }))
    if (!recipe) return
    onAddRecipe(recipe)
    if (!shouldResetOnSelect) {
      setSelectValue(target.value)
    } else {
      setSelectValue('')
    }
  }

  const options = useMemo(
    () => recipes.map(recipe => ({ label: recipe.name, value: recipe.name })),
    [recipes]
  )

  return (
    <div>
      <Select
        fullWidth
        onChange={onChange}
        options={options}
        value={selectValue}
      />
    </div>
  )
}
