import { Box, Modal } from "@mui/material";
import { ModalStyle } from "../../../styles";
import { RecipeEditor } from "./RecipeEditor";
import { useEffect, useState } from "react";
import { Recipe } from "../../types";
import { useRecipeContext } from "../../../context/RecipeContext";
import { defaultRecipe } from "./RecipeCreator";

export function EditRecipeModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { recipeToEdit, updateRecipe } = useRecipeContext();
  const [recipe, setRecipe] = useState<Recipe>(
    recipeToEdit ? recipeToEdit : defaultRecipe
  );

  useEffect(() => {
    if (recipeToEdit) {
      setRecipe(recipeToEdit);
    }
  }, [isOpen, recipeToEdit]);

  const onSubmit = () => {
    if (!recipeToEdit) return;
    updateRecipe(recipeToEdit, recipe);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={ModalStyle}>
        <RecipeEditor
          recipe={recipe}
          handleChange={setRecipe}
          onSubmit={onSubmit}
        />
      </Box>
    </Modal>
  );
}
