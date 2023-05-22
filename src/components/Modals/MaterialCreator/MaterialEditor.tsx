import { Button, Typography } from '@mui/material'
import { useState } from 'react'

import { JobSelector } from '../../shared/JobSelector'
import { LocationSelector } from '../../shared/LocationSelector'
import { NameField } from '../../shared/NameField'
import { TimeField } from '../../shared/TimeField'
import { Material, VariedEvent } from '../../types'
import { ModalHeader } from '../ModalHeader'

export function MaterialEditor({
  handleChange,
  material,
  onSubmit,
  title,
}: {
  material: Material
  onSubmit: () => void
  handleChange: (material: Material) => void
  title: string
}) {
  const [validationError, setValidationError] = useState('')

  const onChange = <T,>(e: VariedEvent<T>) => {
    handleChange({
      ...material,
      [e.target.name]: e.target.value as T,
    })
  }

  return (
    <>
      <ModalHeader label={title} />
      <NameField
        onChange={onChange}
        setValidationError={setValidationError}
        value={material.name}
      />
      <JobSelector onChange={onChange} value={material.job} />
      <LocationSelector onChange={onChange} value={material.location} />
      <TimeField onChange={onChange} value={material.time} />
      <Typography sx={{ color: 'red' }}>{validationError}</Typography>
      <Button disabled={!!validationError} onClick={onSubmit}>
        Submit
      </Button>
    </>
  )
}
