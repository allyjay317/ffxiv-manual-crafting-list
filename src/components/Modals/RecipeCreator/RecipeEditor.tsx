import { Box, Button, SelectChangeEvent, Typography } from '@mui/material'

import { useRecipeContext } from '../../../context/RecipeContext'
import { JobSelector } from '../../shared/JobSelector'
import { MaterialSelector } from '../../shared/MaterialSelector'
import { NameField } from '../../shared/NameField'
import { Material, Quantified, Recipe } from '../../types'
import { namesEqual, namesInequal } from '../../utils'
import { QuantifiedList } from '../../Views/Quantified/QuantifiedList'

function sortMaterials(a: Quantified<Material>, b: Quantified<Material>) {
  return a.item.name.localeCompare(b.item.name)
}

export function RecipeEditor({
  handleChange,
  onSubmit,
  recipe,
}: {
  recipe: Recipe
  handleChange: (recipe: Recipe) => void
  onSubmit: () => void
}) {
  const { materials } = useRecipeContext()

  const onChange = <T,>(
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<T>
  ) => {
    handleChange({
      ...recipe,
      [e.target.name]: e.target.value as T,
    })
  }

  const addMaterial = (material: Material) => {
    handleChange({
      ...recipe,
      materials: [...recipe.materials, { item: material, qty: 1 }].sort(
        sortMaterials
      ),
    })
  }

  const onQtyChange = (material: Material, qty: string) => {
    let numQty = parseInt(qty, 10)
    if (Number.isNaN(numQty)) numQty = 0
    const newMaterials = recipe.materials.filter(namesInequal(material))
    newMaterials.push({ item: material, qty: numQty })
    handleChange({
      ...recipe,
      materials: newMaterials.sort(sortMaterials),
    })
  }

  const filteredMaterials = materials.filter(
    mat => !recipe.materials.find(namesEqual(mat))
  )

  const onDeleteMaterial = (material: Material) => {
    handleChange({
      ...recipe,
      materials: recipe.materials.filter(namesInequal(material)),
    })
  }

  return (
    <Box style={{ display: 'flex', flexDirection: 'column' }}>
      <NameField
        onChange={onChange}
        setValidationError={() => {}}
        value={recipe.name}
      />
      <JobSelector onChange={onChange} value={recipe.job} />
      <Typography>Materials</Typography>
      <MaterialSelector
        materials={filteredMaterials}
        onSelect={option => addMaterial(option.value)}
      />
      <QuantifiedList
        items={recipe.materials}
        onDelete={onDeleteMaterial}
        onQtyChange={onQtyChange}
      />
      <Button onClick={onSubmit}>Submit</Button>
    </Box>
  )
}
