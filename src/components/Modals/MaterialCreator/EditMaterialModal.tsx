import { useEffect, useState } from "react";
import { Material } from "../../types";
import { useRecipeContext } from "../../../context/RecipeContext";
import { MaterialEditor } from "./MaterialEditor";
import { defaultMaterial } from "../../../constants";
import { Modal } from "../ModalBody";

export function EditMaterialModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { materialToEdit, updateMaterial } = useRecipeContext();
  const [material, setMaterial] = useState<Material>(
    materialToEdit ? materialToEdit : defaultMaterial
  );

  useEffect(() => {
    if (materialToEdit) {
      setMaterial(materialToEdit);
    }
  }, [isOpen, materialToEdit]);

  const onSubmit = () => {
    if (!materialToEdit) return;
    updateMaterial(materialToEdit, material);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <MaterialEditor
        title={`Edit ${materialToEdit?.name}`}
        material={material}
        handleChange={setMaterial}
        onSubmit={onSubmit}
      />
    </Modal>
  );
}
