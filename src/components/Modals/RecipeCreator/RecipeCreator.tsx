import { Box, Checkbox, Modal, Typography } from '@mui/material'
import { useState } from 'react'

import { RecipeEditor } from './RecipeEditor'
import { useRecipeContext } from '../../../context/RecipeContext'
import { ModalStyle } from '../../../styles'
import { GatheringJobs, Locations, Recipe } from '../../types'

export const defaultRecipe = {
  job: GatheringJobs.Alchemist,
  materials: [],
  name: '',
}

export function RecipeCreator({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [recipe, setRecipe] = useState<Recipe>(defaultRecipe)
  const [isPrecraft, setIsPrecraft] = useState(false)

  const { addNewMaterial, addNewRecipe } = useRecipeContext()

  const onSubmit = async () => {
    const newMaterials = recipe.materials.filter(material => material.qty > 0)
    const id = await addNewRecipe({ ...recipe, materials: newMaterials })
    if (isPrecraft) {
      addNewMaterial(
        {
          job: recipe.job,
          location: Locations.None,
          name: recipe.name,
          recipe,
          time: '',
        },
        id
      )
    }
    setRecipe(defaultRecipe)
    setIsPrecraft(false)
    onClose()
  }

  return (
    <Modal onClose={onClose} open={isOpen}>
      <Box sx={ModalStyle}>
        <Typography>
          Is Precraft?{' '}
          <Checkbox
            onChange={({ target }) => setIsPrecraft(target.checked)}
            value={isPrecraft}
          />
        </Typography>
        <RecipeEditor
          handleChange={setRecipe}
          onSubmit={onSubmit}
          recipe={recipe}
        />
      </Box>
    </Modal>
  )
}
