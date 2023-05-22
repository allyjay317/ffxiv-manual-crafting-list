import { Box, Tab, Tabs } from '@mui/material'
import { useState } from 'react'

import { CraftingListTab } from './CraftingListTab'
import { FlexWrapCentered, TabsStyle } from '../../styles'

export function TabCreator({ options }: { options: any[] }) {
  const [value, setValue] = useState(0)
  const tabs = options.map((opt, index) => {
    return {
      'aria-controls': `${index}-control`,
      id: `${index}`,
      label: opt.name,
    }
  })

  const handleChange = (e: any, value: number) => {
    setValue(value)
  }

  return (
    <>
      <Box sx={TabsStyle}>
        <Tabs aria-label="tabs" onChange={handleChange} value={value}>
          {tabs.map(tab => (
            <Tab key={`tab-${value}`} {...tab} />
          ))}
        </Tabs>
      </Box>
      <Box sx={FlexWrapCentered}>
        {options.map((opt, index) => (
          <CraftingListTab
            key={`tab-content-${value}`}
            id={index}
            value={value}
          >
            {opt.component}
          </CraftingListTab>
        ))}
      </Box>
    </>
  )
}
