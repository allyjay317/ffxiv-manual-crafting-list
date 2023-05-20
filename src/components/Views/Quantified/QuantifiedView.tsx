import { IconButton, Input } from "@mui/material";
import { Quantified } from "../../types";
import CloseIcon from "@mui/icons-material/Close";

export function QuantifiedView<T>({
  item,
  nameField,
  onQtyChange,
  onDelete,
}: {
  item: Quantified<T>;
  nameField: keyof T;
  onQtyChange: (item: T, qty: string) => void;
  onDelete: () => void;
}) {
  return (
    <div>
      {`${item.item[nameField]} `}
      <Input
        name="qty"
        value={item.qty}
        onChange={({ target }) => {
          let { value } = target;
          onQtyChange(item.item, value);
        }}
      />
      <IconButton onClick={onDelete}>
        <CloseIcon />
      </IconButton>
    </div>
  );
}
