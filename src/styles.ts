export const ModalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  maxHeight: "1000px",
  overflowY: "auto",
  overflowX: "clip",
};

export const WideModalStyle = {
  ...ModalStyle,
  width: "1100px",
};

export const TabsStyle = {
  borderBottom: 1,
  borderColor: "divider",
  textAlign: "center",
};

export const ModalHeaderStyle = {
  marginBottom: "16px",
};

export const FlexWrapCentered = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  width: "100%",
};

export const CraftingListTabStyle = {
  ...FlexWrapCentered,
  p: 3,
};

export const MaterialViewStyle = {
  width: "300px",
  height: "fit-content",
  margin: "16px",
};

export const RecipeViewStyle = { width: "300px", margin: "4px" };
