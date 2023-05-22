import { useState } from 'react'

import { MaterialEditor } from './MaterialEditor'
import { defaultMaterial } from '../../../constants'
import { useRecipeContext } from '../../../context/RecipeContext'
import { Material } from '../../types'
import { Modal } from '../ModalBody'

export function MaterialCreator({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [material, setMaterial] = useState<Material>(defaultMaterial)
  const { addNewMaterial } = useRecipeContext()

  const onSubmit = () => {
    addNewMaterial(material)
    onClose()
  }

  return (
    <Modal onClose={onClose} open={isOpen}>
      <MaterialEditor
        handleChange={setMaterial}
        material={material}
        onSubmit={onSubmit}
        title="New Material"
      />
    </Modal>
  )
}
