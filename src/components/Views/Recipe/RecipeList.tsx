import { Box } from "@mui/material";
import { useRecipeContext } from "../../../context/RecipeContext";
import { RecipeView } from "./RecipeView";
import { FlexWrapCentered } from "../../../styles";

export function RecipeList() {
  const { recipes } = useRecipeContext();
  return (
    <Box sx={FlexWrapCentered}>
      {recipes.map((recipe) => {
        return <RecipeView recipe={recipe} key={recipe.name} isEditable />;
      })}
    </Box>
  );
}
