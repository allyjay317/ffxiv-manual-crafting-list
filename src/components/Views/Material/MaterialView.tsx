import { Locations, Material } from "../../types";
import { Card, Table, TableCell, TableRow } from "@mui/material";
import { useRecipeContext } from "../../../context/RecipeContext";
import { MaterialViewStyle } from "../../../styles";
import { EditHeader } from "../../shared/EditHeader";

export function MaterialView({
  material,
  qty,
  isEditable,
}: {
  material: Material;
  qty?: number;
  isEditable?: boolean;
}) {
  const { setMaterialToEdit } = useRecipeContext();
  return (
    <Card variant="outlined" sx={MaterialViewStyle}>
      <EditHeader
        title={material.name}
        onClick={isEditable ? () => setMaterialToEdit(material) : undefined}
      />
      <Table>
        <TableRow>
          <TableCell>Job</TableCell>
          <TableCell>{material.job}</TableCell>
        </TableRow>
        {material.location !== Locations.None && (
          <TableRow>
            <TableCell>Location</TableCell>
            <TableCell>
              {material.location}
              {material.time && ` - ${material.time}`}
            </TableCell>
          </TableRow>
        )}
        {qty !== 0 && (
          <TableRow>
            <TableCell>Qty</TableCell>
            <TableCell>{qty}</TableCell>
          </TableRow>
        )}
      </Table>
    </Card>
  );
}
