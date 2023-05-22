import { Autocomplete, TextField } from '@mui/material'
import { useState } from 'react'

import { useRecipeContext } from '../../context/RecipeContext'
import { Material } from '../types'

type Option = {
  label: string
  value: Material
}

export function MaterialSelector({
  materials,
  onSelect,
}: {
  onSelect: (material: Option) => void
  materials?: Material[]
}) {
  const { materials: globalMaterials } = useRecipeContext()

  const [value] = useState<Option | null>()
  const [inputValue, setInputValue] = useState('')

  const options = (materials ?? globalMaterials).map(mat => {
    return {
      label: mat.name,
      value: mat,
    }
  })

  const handleSelect = (e: any, selectedOption: Option | null) => {
    if (!selectedOption) return
    onSelect(selectedOption)
  }

  return (
    <Autocomplete
      inputValue={inputValue}
      onChange={handleSelect}
      onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
      options={options}
      renderInput={params => <TextField {...params} label="Materials" />}
      sx={{ width: 300 }}
      value={value}
    />
  )
}
