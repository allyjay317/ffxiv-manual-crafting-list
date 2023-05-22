import { InputLabel, SelectChangeEvent } from '@mui/material'

import { SelectContainer, SelectLabel, SelectWithLabel } from './styles'
import { LOCATIONS } from '../../constants'
import { Select } from '../Select/Select'
import { Locations } from '../types'

const id = 'location-label'

export function LocationSelector({
  onChange,
  value,
}: {
  value: Locations
  onChange: (event: SelectChangeEvent<Locations>) => void
}) {
  return (
    <div style={SelectContainer}>
      <InputLabel id={id} sx={SelectLabel}>
        Location
      </InputLabel>

      <Select
        label="Location"
        labelId={id}
        name="location"
        onChange={onChange}
        options={LOCATIONS}
        sx={SelectWithLabel}
        value={value}
      />
    </div>
  )
}
