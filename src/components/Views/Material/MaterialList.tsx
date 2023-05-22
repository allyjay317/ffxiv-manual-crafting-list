import { Box, Typography } from '@mui/material'
import { useMemo } from 'react'

import { MaterialView } from './MaterialView'
import { useRecipeContext } from '../../../context/RecipeContext'
import { FlexWrapCentered } from '../../../styles'
import { Material, Quantified } from '../../types'

export function MaterialList({
  isEditable = false,
  materials,
  recipeMaterials,
}: {
  recipeMaterials?: Quantified<Material>[]
  materials?: Material[]
  isEditable?: boolean
}) {
  const { materials: globalMaterials } = useRecipeContext()

  const materialList = useMemo(() => {
    if (recipeMaterials) return recipeMaterials

    if (materials) return materials.map(mat => ({ item: mat, qty: 0 }))

    return globalMaterials.map(mat => ({ item: mat, qty: 0 }))
  }, [recipeMaterials, materials, globalMaterials])

  return (
    <div>
      <Typography>Materials</Typography>
      <Box sx={FlexWrapCentered}>
        {materialList.map(material => (
          <MaterialView
            key={material.item.name}
            isEditable={isEditable}
            material={material.item}
            qty={material.qty}
          />
        ))}
      </Box>
    </div>
  )
}
