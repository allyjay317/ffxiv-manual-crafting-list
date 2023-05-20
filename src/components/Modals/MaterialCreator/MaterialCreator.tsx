import { useState } from "react";
import { Material } from "../../types";
import { useRecipeContext } from "../../../context/RecipeContext";
import { MaterialEditor } from "./MaterialEditor";
import { defaultMaterial } from "../../../constants";
import { Modal } from "../ModalBody";

export function MaterialCreator({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [material, setMaterial] = useState<Material>(defaultMaterial);
  const { addNewMaterial } = useRecipeContext();

  const onSubmit = () => {
    addNewMaterial(material);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <MaterialEditor
        title="New Material"
        material={material}
        handleChange={setMaterial}
        onSubmit={onSubmit}
      />
    </Modal>
  );
}
