import { Box, Modal as MUIModal } from '@mui/material'

import { ModalHeader } from './ModalHeader'
import { ModalStyle, WideModalStyle } from '../../styles'

export function Modal({
  children,
  label,
  onClose,
  open,
  wide,
}: {
  children: React.ReactNode
  wide?: boolean
  open: boolean
  onClose: () => void
  label?: string
}) {
  return (
    <MUIModal onClose={onClose} open={open}>
      <Box sx={wide ? WideModalStyle : ModalStyle}>
        {label && <ModalHeader label={label} />}
        {children}
      </Box>
    </MUIModal>
  )
}
