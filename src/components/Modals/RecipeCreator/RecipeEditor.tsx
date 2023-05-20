import {
  Box,
  Button,
  Input,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { Material, Quantified, Recipe } from "../../types";
import { useRecipeContext } from "../../../context/RecipeContext";
import { MaterialSelector } from "../../shared/MaterialSelector";
import { QuantifiedList } from "../../Views/Quantified/QuantifiedList";
import { namesEqual, namesInequal } from "../../utils";
import { JOBS } from "../../../constants";
import { NameField } from "../../shared/NameField";
import { JobSelector } from "../../shared/JobSelector";

function sortMaterials(a: Quantified<Material>, b: Quantified<Material>) {
  return a.item.name.localeCompare(b.item.name);
}

export function RecipeEditor({
  recipe,
  handleChange,
  onSubmit,
}: {
  recipe: Recipe;
  handleChange: (recipe: Recipe) => void;
  onSubmit: () => void;
}) {
  const { materials } = useRecipeContext();

  const onChange = <T,>(
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<T>
  ) => {
    handleChange({
      ...recipe,
      [e.target.name]: e.target.value as T,
    });
  };

  const addMaterial = (material: Material) => {
    handleChange({
      ...recipe,
      materials: [...recipe.materials, { item: material, qty: 1 }].sort(
        sortMaterials
      ),
    });
  };

  const onQtyChange = (material: Material, qty: string) => {
    let numQty = parseInt(qty);
    if (isNaN(numQty)) numQty = 0;
    const newMaterials = recipe.materials.filter(namesInequal(material));
    newMaterials.push({ item: material, qty: numQty });
    handleChange({
      ...recipe,
      materials: newMaterials.sort(sortMaterials),
    });
  };

  const filteredMaterials = materials.filter(
    (mat) => !recipe.materials.find(namesEqual(mat))
  );

  const onDeleteMaterial = (material: Material) => {
    handleChange({
      ...recipe,
      materials: recipe.materials.filter(namesInequal(material)),
    });
  };

  return (
    <Box style={{ display: "flex", flexDirection: "column" }}>
      <NameField
        value={recipe.name}
        onChange={onChange}
        setValidationError={() => {}}
      />
      <JobSelector value={recipe.job} onChange={onChange} />
      <Typography>Materials</Typography>
      <MaterialSelector
        onSelect={(option) => addMaterial(option.value)}
        materials={filteredMaterials}
      />
      <QuantifiedList
        items={recipe.materials}
        onQtyChange={onQtyChange}
        onDelete={onDeleteMaterial}
      />
      <Button onClick={onSubmit}>Submit</Button>
    </Box>
  );
}
