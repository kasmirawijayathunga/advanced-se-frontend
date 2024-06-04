import { Box, Divider, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
    <Box sx={{ position: "fixed", bottom: 0, width: "100%", textAlign: "right", px: 1.5, pb:0.25, backgroundColor: (theme)=>theme.palette.background.paper }}>
        <Divider />
        <Typography variant="caption">Copyright © All Rights Reserved | <Link to="https://ryzoe.com">Ryzoe Solution</Link></Typography>
    </Box>
    </>
  )
}

export default Footer