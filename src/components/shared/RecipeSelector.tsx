import { SelectChangeEvent } from "@mui/material";
import { useRecipeContext } from "../../context/RecipeContext";
import { Recipe } from "../types";
import { useMemo, useState } from "react";
import { namesEqual } from "../utils";
import { Select } from "../Select/Select";

export function RecipeSelector({
  onAddRecipe,
  shouldResetOnSelect,
  recipes,
}: {
  onAddRecipe: (recipe: Recipe) => void;
  shouldResetOnSelect?: boolean;
  recipes: Recipe[];
}) {
  const [selectValue, setSelectValue] = useState("");
  const { recipes: globalRecipes } = useRecipeContext();

  const onChange = ({ target }: SelectChangeEvent<string>) => {
    const recipe = globalRecipes.find(namesEqual({ name: target.value }));
    if (!recipe) return;
    onAddRecipe(recipe);
    if (!shouldResetOnSelect) {
      setSelectValue(target.value);
    } else {
      setSelectValue("");
    }
  };

  const options = useMemo(
    () => recipes.map((recipe) => ({ label: recipe.name, value: recipe.name })),
    [recipes]
  );

  return (
    <div>
      <Select
        fullWidth
        onChange={onChange}
        value={selectValue}
        options={options}
      />
    </div>
  );
}
