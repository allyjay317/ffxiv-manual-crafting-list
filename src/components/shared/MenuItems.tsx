import { MenuItem } from '@mui/material'

type Item<T> = T & { label: string; value: string }

export function MenuItems<T>({ items }: { items: Item<T>[] }) {
  return (
    <>
      {items.map(item => {
        return (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        )
      })}
    </>
  )
}
