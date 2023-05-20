import { Quantified } from "./types";

export function convertToNumber(str: string, defaultVal: number = 0) {
  let numVer = parseInt(str, 10);
  if (isNaN(numVer)) numVer = defaultVal;
  return numVer;
}

type TWithName = { [x: string]: any; name: string };

export function namesEqual<T extends TWithName, U extends TWithName>(
  b: Quantified<U> | U
) {
  let normalB = "name" in b ? (b as U) : b.item;
  return function (a: Quantified<T> | T) {
    let normalA = "name" in a ? (a as T) : a.item;
    return normalA.name === normalB.name;
  };
}

export function namesInequal<T extends TWithName, U extends TWithName>(
  b: Quantified<U> | U
) {
  let normalB = "name" in b ? (b as U) : b.item;
  return function (a: Quantified<T> | T) {
    let normalA = "name" in a ? (a as T) : a.item;
    return normalA.name !== normalB.name;
  };
}
