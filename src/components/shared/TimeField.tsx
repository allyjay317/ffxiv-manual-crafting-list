import { Checkbox, InputAdornment, TextField, Typography } from '@mui/material'

import { useBoolean } from '../../hooks/useBoolean'
import { VariedEvent } from '../types'

export function TimeField({
  onChange,
  value,
}: {
  value: string
  onChange: (event: VariedEvent<string>) => void
}) {
  const [isTimed, isTimedNode] = useBoolean(false)
  const handleChange = (event: VariedEvent<string>) => {
    const numVal = parseInt(event.target.value, 10)
    if (numVal < 1 || numVal > 12) return
    if (`${numVal}` !== event.target.value) return
    onChange(event)
  }
  return (
    <div style={{ width: '100%' }}>
      <Typography>
        Is Timed? <Checkbox checked={isTimed} onChange={isTimedNode.toggle} />
      </Typography>
      {isTimed && (
        <TextField
          defaultValue={1}
          fullWidth
          InputProps={{
            endAdornment: <InputAdornment position="end">am/pm</InputAdornment>,
          }}
          label="Time"
          name="time"
          onChange={handleChange}
          type="number"
          value={value}
        />
      )}
    </div>
  )
}
