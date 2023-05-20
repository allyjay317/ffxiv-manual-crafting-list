import { Autocomplete, TextField } from "@mui/material";
import { useRecipeContext } from "../../context/RecipeContext";
import { useState } from "react";
import { Material } from "../types";

type Option = {
  label: string;
  value: Material;
};

export function MaterialSelector({
  onSelect,
  materials,
}: {
  onSelect: (material: Option) => void;
  materials?: Material[];
}) {
  const { materials: globalMaterials } = useRecipeContext();

  const [value] = useState<Option | null>();
  const [inputValue, setInputValue] = useState("");

  const options = (materials ?? globalMaterials).map((mat) => {
    return {
      label: mat.name,
      value: mat,
    };
  });

  const handleSelect = (e: any, selectedOption: Option | null) => {
    if (!selectedOption) return;
    onSelect(selectedOption);
  };

  return (
    <>
      <Autocomplete
        value={value}
        onChange={handleSelect}
        inputValue={inputValue}
        onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Materials" />}
      />
    </>
  );
}
