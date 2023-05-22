import { Button } from '@mui/material'
import { useMemo, useState } from 'react'

import { getMaterialsForRecipe } from './utils'
import { useRecipeContext } from '../../../context/RecipeContext'
import { RecipeSelector } from '../../shared/RecipeSelector'
import { Material, Quantified, Recipe } from '../../types'
import { convertToNumber, namesEqual, namesInequal } from '../../utils'
import { CraftingListView } from '../../Views/CraftingList/CraftingListView'
import { QuantifiedList } from '../../Views/Quantified/QuantifiedList'
import { Modal } from '../ModalBody'

function sortMaterialsByTime(
  materialList: Record<string, Quantified<Material>>
) {
  return Object.values(materialList).sort((a, b) => {
    if (!a.item.time) {
      return -1
    }
    if (b.item.time) {
      return 1
    }
    return parseInt(a.item.time, 10) - parseInt(b.item.time, 10)
  })
}

export function CraftingListCreator({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [craftingList, setCraftingList] = useState<Quantified<Recipe>[]>([])
  const [materials, setMaterials] = useState<Quantified<Material>[]>([])

  const { recipes } = useRecipeContext()

  const onCraftClick = () => {
    const materialList = getMaterialsForRecipe(craftingList, recipes)

    setMaterials(sortMaterialsByTime(materialList))
    setCraftingList([])
  }

  const onAddRecipe = (recipe: Recipe) => {
    setCraftingList([...craftingList, { item: recipe, qty: 1 }])
  }

  const onQtyChange = (recipe: Recipe, qty: string) => {
    const numQty = convertToNumber(qty)
    const newMaterials = craftingList.filter(namesInequal(recipe))
    newMaterials.push({ item: recipe, qty: numQty })
    setCraftingList(newMaterials)
  }

  const onDeleteRecipe = (recipe: Recipe) => {
    setCraftingList(craftingList.filter(namesInequal(recipe)))
  }

  const filteredRecipes = useMemo(() => {
    return recipes.filter(rec => !craftingList.find(namesEqual(rec)))
  }, [craftingList, recipes])

  return (
    <Modal label="Create Crafting List" onClose={onClose} open={isOpen} wide>
      <RecipeSelector
        onAddRecipe={onAddRecipe}
        recipes={filteredRecipes}
        shouldResetOnSelect
      />
      <QuantifiedList
        items={craftingList}
        onDelete={onDeleteRecipe}
        onQtyChange={onQtyChange}
      />
      <Button onClick={onCraftClick}>Craft!</Button>
      <CraftingListView craftingList={materials} />
    </Modal>
  )
}
