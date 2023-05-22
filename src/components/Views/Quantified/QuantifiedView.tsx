import CloseIcon from '@mui/icons-material/Close'
import { IconButton, Input } from '@mui/material'

import { Quantified } from '../../types'

export function QuantifiedView<T>({
  item,
  nameField,
  onDelete,
  onQtyChange,
}: {
  item: Quantified<T>
  nameField: keyof T
  onQtyChange: (item: T, qty: string) => void
  onDelete: () => void
}) {
  return (
    <div>
      {`${item.item[nameField]} `}
      <Input
        name="qty"
        onChange={({ target }) => {
          const { value } = target
          onQtyChange(item.item, value)
        }}
        value={item.qty}
      />
      <IconButton onClick={onDelete}>
        <CloseIcon />
      </IconButton>
    </div>
  )
}
