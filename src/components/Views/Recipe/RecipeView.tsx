import { Card, CardContent } from '@mui/material'

import { useRecipeContext } from '../../../context/RecipeContext'
import { RecipeViewStyle } from '../../../styles'
import { EditHeader } from '../../shared/EditHeader'
import { Recipe } from '../../types'
import { MaterialList } from '../Material/MaterialList'

export function RecipeView({
  isEditable,
  recipe,
}: {
  recipe: Recipe
  isEditable?: boolean
}) {
  const { setRecipeToEdit } = useRecipeContext()
  return (
    <Card sx={RecipeViewStyle} variant="outlined">
      <CardContent>
        <EditHeader
          onClick={isEditable ? () => setRecipeToEdit(recipe) : undefined}
          sx={{ fontSize: 24 }}
          title={recipe.name}
          variant="h1"
        />
        <MaterialList recipeMaterials={recipe.materials} />
      </CardContent>
    </Card>
  )
}
