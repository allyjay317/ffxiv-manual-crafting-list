import { TextField } from "@mui/material";
import { useRecipeContext } from "../../context/RecipeContext";
import { useState } from "react";
import { useBoolean } from "../../hooks/useBoolean";
import { namesEqual } from "../utils";

export function NameField({
  value,
  onChange,
  setValidationError,
}: {
  value: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  setValidationError: (error: string) => void;
}) {
  const { materials, recipes } = useRecipeContext();
  const [originalName] = useState(value);
  const [isError, controller] = useBoolean(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    controller.setFalse();
    setValidationError("");
    onChange(event);
  };

  const onBlur = () => {
    if (value === originalName) return;
    const foundMaterial = materials.find(namesEqual({ name: value }));
    const foundRecipe = recipes.find(namesEqual({ name: value }));
    if (foundMaterial || foundRecipe) {
      setValidationError("Material already exists");
      controller.setTrue();
    }
  };

  return (
    <TextField
      label="Name"
      name="name"
      value={value}
      onChange={handleChange}
      inputProps={{ onBlur }}
      error={isError}
    />
  );
}
