import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import { IconButton, Typography } from '@mui/material'

import { useRecipeContext } from '../../context/RecipeContext'

export function EditHeader({
  onClick,
  title,
  ...props
}: {
  title: string
  onClick?: () => void
} & React.ComponentProps<typeof Typography>) {
  const { sx, ...typographyProps } = props
  const { deleteItem } = useRecipeContext()

  const onDelete = () => {
    deleteItem(title)
  }

  return (
    <Typography sx={{ textAlign: 'center', ...sx }} {...typographyProps}>
      {title}
      {onClick && (
        <>
          <IconButton onClick={onClick}>
            <EditIcon />
          </IconButton>

          <IconButton onClick={onDelete}>
            <CloseIcon />
          </IconButton>
        </>
      )}
    </Typography>
  )
}
