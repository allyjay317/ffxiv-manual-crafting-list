import { Box } from '@mui/material'

import { RecipeView } from './RecipeView'
import { useRecipeContext } from '../../../context/RecipeContext'
import { FlexWrapCentered } from '../../../styles'

export function RecipeList() {
  const { recipes } = useRecipeContext()
  return (
    <Box sx={FlexWrapCentered}>
      {recipes.map(recipe => {
        return <RecipeView key={recipe.name} isEditable recipe={recipe} />
      })}
    </Box>
  )
}
