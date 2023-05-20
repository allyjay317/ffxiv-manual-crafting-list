import { useState } from "react";
import { GatheringJobs, Locations, Recipe } from "../../types";
import { useRecipeContext } from "../../../context/RecipeContext";
import { Box, Checkbox, Modal, Typography } from "@mui/material";
import { RecipeEditor } from "./RecipeEditor";
import { ModalStyle } from "../../../styles";

export const defaultRecipe = {
  name: "",
  materials: [],
  job: GatheringJobs.Alchemist,
};

export function RecipeCreator({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [recipe, setRecipe] = useState<Recipe>(defaultRecipe);
  const [isPrecraft, setIsPrecraft] = useState(false);

  const { addNewRecipe, addNewMaterial } = useRecipeContext();

  const onSubmit = async () => {
    const newMaterials = recipe.materials.filter(
      (material) => material.qty > 0
    );
    const id = await addNewRecipe({ ...recipe, materials: newMaterials });
    if (isPrecraft) {
      addNewMaterial(
        {
          name: recipe.name,
          job: recipe.job,
          location: Locations.None,
          time: "",
          recipe: recipe,
        },
        id
      );
    }
    setRecipe(defaultRecipe);
    setIsPrecraft(false);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={ModalStyle}>
        <Typography>
          Is Precraft?{" "}
          <Checkbox
            value={isPrecraft}
            onChange={({ target }) => setIsPrecraft(target.checked)}
          />
        </Typography>
        <RecipeEditor
          recipe={recipe}
          handleChange={setRecipe}
          onSubmit={onSubmit}
        />
      </Box>
    </Modal>
  );
}
