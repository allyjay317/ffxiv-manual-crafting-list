import { Box, Typography } from "@mui/material";
import { useRecipeContext } from "../../../context/RecipeContext";
import { MaterialView } from "./MaterialView";
import { Material, Quantified } from "../../types";
import { useMemo } from "react";
import { FlexWrapCentered } from "../../../styles";

export function MaterialList({
  recipeMaterials,
  materials,
  isEditable = false,
}: {
  recipeMaterials?: Quantified<Material>[];
  materials?: Material[];
  isEditable?: boolean;
}) {
  const { materials: globalMaterials } = useRecipeContext();

  const materialList = useMemo(() => {
    if (recipeMaterials) return recipeMaterials;

    if (materials) return materials.map((mat) => ({ item: mat, qty: 0 }));

    return globalMaterials.map((mat) => ({ item: mat, qty: 0 }));
  }, [recipeMaterials, materials, globalMaterials]);

  return (
    <div>
      <Typography>Materials</Typography>
      <Box sx={FlexWrapCentered}>
        {materialList.map((material) => (
          <MaterialView
            material={material.item}
            qty={material.qty}
            isEditable={isEditable}
          />
        ))}
      </Box>
    </div>
  );
}
