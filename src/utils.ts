import { SelectOption } from "./components/types";

export function selectOptionSort<T extends string>(
  a: SelectOption<T>,
  b: SelectOption<T>
) {
  return a.label.localeCompare(b.label);
}
