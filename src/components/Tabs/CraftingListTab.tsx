import { Box } from "@mui/material";
import { CraftingListTabStyle } from "../../styles";

export function CraftingListTab({
  value,
  id,
  children,
}: {
  value: number;
  id: number;
  children: React.ReactNode;
}) {
  return (
    <div
      role="tabpanel"
      hidden={value !== id}
      id={`${id}-panel`}
      aria-labelledby={`${id}-control`}
    >
      <Box sx={CraftingListTabStyle}>{children}</Box>
    </div>
  );
}
