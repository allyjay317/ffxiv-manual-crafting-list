import { Card, Table, TableCell, TableRow } from '@mui/material'

import { useRecipeContext } from '../../../context/RecipeContext'
import { MaterialViewStyle } from '../../../styles'
import { EditHeader } from '../../shared/EditHeader'
import { Locations, Material } from '../../types'

export function MaterialView({
  isEditable,
  material,
  qty,
}: {
  material: Material
  qty?: number
  isEditable?: boolean
}) {
  const { setMaterialToEdit } = useRecipeContext()
  return (
    <Card sx={MaterialViewStyle} variant="outlined">
      <EditHeader
        onClick={isEditable ? () => setMaterialToEdit(material) : undefined}
        title={material.name}
      />
      <Table>
        <TableRow>
          <TableCell>Job</TableCell>
          <TableCell>{material.job}</TableCell>
        </TableRow>
        {material.location !== Locations.None && (
          <TableRow>
            <TableCell>Location</TableCell>
            <TableCell>
              {material.location}
              {material.time && ` - ${material.time}`}
            </TableCell>
          </TableRow>
        )}
        {qty !== 0 && (
          <TableRow>
            <TableCell>Qty</TableCell>
            <TableCell>{qty}</TableCell>
          </TableRow>
        )}
      </Table>
    </Card>
  )
}
