import { QuantifiedView } from './QuantifiedView'
import { Quantified } from '../../types'

export function QuantifiedList<T extends { [x: string]: any; name: string }>({
  items,
  onDelete,
  onQtyChange,
}: {
  items: Quantified<T>[]
  onQtyChange: (item: T, qty: string) => void
  onDelete: (item: T) => void
}) {
  return (
    <>
      {items.map(item => (
        <QuantifiedView
          key={item.item.name}
          item={item}
          nameField="name"
          onDelete={() => onDelete(item.item)}
          onQtyChange={onQtyChange}
        />
      ))}
    </>
  )
}
