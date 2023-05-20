import { IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { useRecipeContext } from "../../context/RecipeContext";
import { namesEqual } from "../utils";
import { useMemo } from "react";

export function EditHeader({
  title,
  onClick,
  ...props
}: {
  title: string;
  onClick?: () => void;
} & React.ComponentProps<typeof Typography>) {
  const { sx, ...typographyProps } = props;
  const { recipes, deleteItem } = useRecipeContext();

  const onDelete = () => {
    deleteItem(title);
  };

  return (
    <>
      <Typography sx={{ textAlign: "center", ...sx }} {...typographyProps}>
        {title}
        {onClick && (
          <>
            <IconButton onClick={onClick}>
              <EditIcon />
            </IconButton>

            <IconButton onClick={onDelete}>
              <CloseIcon />
            </IconButton>
          </>
        )}
      </Typography>
    </>
  );
}
