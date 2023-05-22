import { useEffect, useState } from 'react'

import { MaterialEditor } from './MaterialEditor'
import { defaultMaterial } from '../../../constants'
import { useRecipeContext } from '../../../context/RecipeContext'
import { Material } from '../../types'
import { Modal } from '../ModalBody'

export function EditMaterialModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const { materialToEdit, updateMaterial } = useRecipeContext()
  const [material, setMaterial] = useState<Material>(
    materialToEdit || defaultMaterial
  )

  useEffect(() => {
    if (materialToEdit) {
      setMaterial(materialToEdit)
    }
  }, [isOpen, materialToEdit])

  const onSubmit = () => {
    if (!materialToEdit) return
    updateMaterial(materialToEdit, material)
    onClose()
  }

  return (
    <Modal onClose={onClose} open={isOpen}>
      <MaterialEditor
        handleChange={setMaterial}
        material={material}
        onSubmit={onSubmit}
        title={`Edit ${materialToEdit?.name}`}
      />
    </Modal>
  )
}
