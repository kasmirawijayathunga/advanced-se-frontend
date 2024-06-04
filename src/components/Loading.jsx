import { Backdrop, CircularProgress } from '@mui/material'

function Loading({ visible=true }) {
  return (
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={visible}
    >
        <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default Loading