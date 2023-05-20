import { Box } from "@mui/material";
import { ModalStyle, WideModalStyle } from "../../styles";
import { Modal as MUIModal } from "@mui/material";
import { ModalHeader } from "./ModalHeader";

export function Modal({
  children,
  wide,
  open,
  onClose,
  label,
}: {
  children: React.ReactNode;
  wide?: boolean;
  open: boolean;
  onClose: () => void;
  label?: string;
}) {
  return (
    <MUIModal open={open} onClose={onClose}>
      <Box sx={wide ? WideModalStyle : ModalStyle}>
        {label && <ModalHeader label={label} />}
        {children}
      </Box>
    </MUIModal>
  );
}
