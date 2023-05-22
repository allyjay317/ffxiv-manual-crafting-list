import { Box } from '@mui/material'

import { CraftingListTabStyle } from '../../styles'

export function CraftingListTab({
  children,
  id,
  value,
}: {
  value: number
  id: number
  children: React.ReactNode
}) {
  return (
    <div
      aria-labelledby={`${id}-control`}
      hidden={value !== id}
      id={`${id}-panel`}
      role="tabpanel"
    >
      <Box sx={CraftingListTabStyle}>{children}</Box>
    </div>
  )
}
