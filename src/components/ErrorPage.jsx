import { Box, Container, Typography } from '@mui/material'

function ErrorPage({ errorCode }) {
  return (
    <Container sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Box>
            <Typography variant="h3">404</Typography>
            <Typography variant="subtitle1" sx={{ textTransform: "uppercase" }}>Sorry, The page you are looking for is not found</Typography>
        </Box>
    </Container>
  )
}

export default ErrorPage