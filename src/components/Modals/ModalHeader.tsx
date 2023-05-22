import { Typography } from '@mui/material'

import { ModalHeaderStyle } from '../../styles'

export function ModalHeader({ label }: { label: string }) {
  return (
    <Typography sx={ModalHeaderStyle} variant="h4">
      {label}
    </Typography>
  )
}
