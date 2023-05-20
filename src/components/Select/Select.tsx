import { SelectOption } from "../types";
import { Select as MUISelect, MenuItem } from "@mui/material";

export function Select<T extends string>({
  options,
  ...selectOptions
}: { options: SelectOption<T>[] } & React.ComponentProps<typeof MUISelect<T>>) {
  return (
    <MUISelect<T> {...selectOptions}>
      {options.map((option) => (
        <MenuItem key={option.label} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </MUISelect>
  );
}
