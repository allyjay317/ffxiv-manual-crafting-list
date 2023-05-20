import { useState } from "react";
import { FlexWrapCentered, TabsStyle } from "../../styles";
import { Box, Tab, Tabs } from "@mui/material";
import { CraftingListTab } from "./CraftingListTab";

export function TabCreator({ options }: { options: any[] }) {
  const [value, setValue] = useState(0);
  const tabs = options.map((opt, index) => {
    return {
      label: opt.name,
      id: `${index}`,
      "aria-controls": `${index}-control`,
    };
  });

  const handleChange = (e: any, value: number) => {
    setValue(value);
  };

  return (
    <>
      <Box sx={TabsStyle}>
        <Tabs value={value} onChange={handleChange} aria-label="tabs">
          {tabs.map((tab) => (
            <Tab {...tab} />
          ))}
        </Tabs>
      </Box>
      <Box sx={FlexWrapCentered}>
        {options.map((opt, index) => (
          <CraftingListTab value={value} id={index}>
            {opt.component}
          </CraftingListTab>
        ))}
      </Box>
    </>
  );
}
