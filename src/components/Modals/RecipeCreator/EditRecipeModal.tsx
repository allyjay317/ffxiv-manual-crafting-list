import { Box, Modal } from '@mui/material'
import { useEffect, useState } from 'react'

import { defaultRecipe } from './RecipeCreator'
import { RecipeEditor } from './RecipeEditor'
import { useRecipeContext } from '../../../context/RecipeContext'
import { ModalStyle } from '../../../styles'
import { Recipe } from '../../types'

export function EditRecipeModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const { recipeToEdit, updateRecipe } = useRecipeContext()
  const [recipe, setRecipe] = useState<Recipe>(recipeToEdit || defaultRecipe)

  useEffect(() => {
    if (recipeToEdit) {
      setRecipe(recipeToEdit)
    }
  }, [isOpen, recipeToEdit])

  const onSubmit = () => {
    if (!recipeToEdit) return
    updateRecipe(recipeToEdit, recipe)
    onClose()
  }

  return (
    <Modal onClose={onClose} open={isOpen}>
      <Box sx={ModalStyle}>
        <RecipeEditor
          handleChange={setRecipe}
          onSubmit={onSubmit}
          recipe={recipe}
        />
      </Box>
    </Modal>
  )
}
