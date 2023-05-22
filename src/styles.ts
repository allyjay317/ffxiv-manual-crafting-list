export const ModalStyle = {
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  display: 'flex',
  flexDirection: 'column',
  left: '50%',
  maxHeight: '1000px',
  overflowX: 'clip',
  overflowY: 'auto',
  p: 4,
  position: 'absolute' as const,
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
}

export const WideModalStyle = {
  ...ModalStyle,
  width: '1100px',
}

export const TabsStyle = {
  borderBottom: 1,
  borderColor: 'divider',
  textAlign: 'center',
}

export const ModalHeaderStyle = {
  marginBottom: '16px',
}

export const FlexWrapCentered = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  width: '100%',
}

export const CraftingListTabStyle = {
  ...FlexWrapCentered,
  p: 3,
}

export const MaterialViewStyle = {
  height: 'fit-content',
  margin: '16px',
  width: '300px',
}

export const RecipeViewStyle = { margin: '4px', width: '300px' }
