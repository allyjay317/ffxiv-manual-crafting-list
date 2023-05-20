import { Typography } from "@mui/material";
import { ModalHeaderStyle } from "../../styles";

export function ModalHeader({ label }: { label: string }) {
  return (
    <Typography variant="h4" sx={ModalHeaderStyle}>
      {label}
    </Typography>
  );
}
