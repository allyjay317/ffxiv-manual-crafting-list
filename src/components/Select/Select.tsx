import { MenuItem, Select as MUISelect } from '@mui/material'

import { SelectOption } from '../types'

export function Select<T extends string>({
  options,
  ...selectOptions
}: { options: SelectOption<T>[] } & React.ComponentProps<typeof MUISelect<T>>) {
  return (
    <MUISelect<T> {...selectOptions}>
      {options.map(option => (
        <MenuItem key={option.label} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </MUISelect>
  )
}
