import { Recipe } from "../../types";
import { Card, CardContent } from "@mui/material";
import { useRecipeContext } from "../../../context/RecipeContext";
import { EditHeader } from "../../shared/EditHeader";
import { MaterialList } from "../Material/MaterialList";
import { RecipeViewStyle } from "../../../styles";

export function RecipeView({
  recipe,
  isEditable,
}: {
  recipe: Recipe;
  isEditable?: boolean;
}) {
  const { setRecipeToEdit } = useRecipeContext();
  return (
    <Card variant="outlined" sx={RecipeViewStyle}>
      <CardContent>
        <EditHeader
          sx={{ fontSize: 24 }}
          variant="h1"
          title={recipe.name}
          onClick={isEditable ? () => setRecipeToEdit(recipe) : undefined}
        />
        <MaterialList recipeMaterials={recipe.materials} />
      </CardContent>
    </Card>
  );
}
