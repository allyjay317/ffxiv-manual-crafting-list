import { InputLabel, SelectChangeEvent } from '@mui/material'

import { SelectContainer, SelectLabel, SelectWithLabel } from './styles'
import { JOBS } from '../../constants'
import { Select } from '../Select/Select'
import { GatheringJobs } from '../types'

const id = 'job-label'

export function JobSelector({
  onChange,
  value,
}: {
  value: GatheringJobs
  onChange: (event: SelectChangeEvent<GatheringJobs>) => void
}) {
  return (
    <div style={SelectContainer}>
      <InputLabel id={id} sx={SelectLabel}>
        Required Job
      </InputLabel>
      <Select
        label="Job"
        labelId={id}
        name="job"
        onChange={onChange}
        options={JOBS}
        sx={SelectWithLabel}
        value={value}
      />
    </div>
  )
}
