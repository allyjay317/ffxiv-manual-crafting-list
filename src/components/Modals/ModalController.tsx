import { Button } from '@mui/material'

import { CraftingListCreator } from './CraftingListCreator/CraftingListCreator'
import { MaterialCreator } from './MaterialCreator/MaterialCreator'
import { RecipeCreator } from './RecipeCreator/RecipeCreator'
import { useBoolean } from '../../hooks/useBoolean'

export function ModalController() {
  const [isMaterialCreatorOpen, materialCreator] = useBoolean()
  const [isRecipeCreatorOpen, recipeCreator] = useBoolean()
  const [isCraftingListCreatorOpen, craftingListCreator] = useBoolean()

  return (
    <>
      <Button onClick={materialCreator.setTrue}>Create Material</Button>
      <Button onClick={recipeCreator.setTrue}>Create Recipe</Button>
      <Button onClick={craftingListCreator.setTrue}>
        Create Crafting List
      </Button>
      <RecipeCreator
        isOpen={isRecipeCreatorOpen}
        onClose={recipeCreator.setFalse}
      />
      <MaterialCreator
        isOpen={isMaterialCreatorOpen}
        onClose={materialCreator.setFalse}
      />
      <CraftingListCreator
        isOpen={isCraftingListCreatorOpen}
        onClose={craftingListCreator.setFalse}
      />
    </>
  )
}
