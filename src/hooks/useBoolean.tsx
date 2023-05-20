import { useCallback, useState } from "react";

export function useBoolean(initalValue: boolean = false) {
  const [value, setValue] = useState(initalValue);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue(!value), [value]);

  return [value, { setTrue, setFalse, toggle }] as const;
}
