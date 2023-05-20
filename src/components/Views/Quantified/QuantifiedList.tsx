import { Quantified } from "../../types";
import { QuantifiedView } from "./QuantifiedView";

export function QuantifiedList<T extends { [x: string]: any; name: string }>({
  items,
  onQtyChange,
  onDelete,
}: {
  items: Quantified<T>[];
  onQtyChange: (item: T, qty: string) => void;
  onDelete: (item: T) => void;
}) {
  return (
    <>
      {items.map((item) => (
        <QuantifiedView
          item={item}
          nameField="name"
          onQtyChange={onQtyChange}
          onDelete={() => onDelete(item.item)}
        />
      ))}
    </>
  );
}
