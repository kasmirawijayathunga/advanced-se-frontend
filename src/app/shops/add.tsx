import { Box, Button, Container, Modal, Typography } from '@mui/material'
import React, { useState } from 'react'
import ShopForm from './form';

function AddShop() {
    const [openDialog, setOpenDialog] = useState(false);
    return (
        <>
            <Box sx={{ m: 2, textAlign: "right" }}>
                <Button variant="contained" onClick={()=>setOpenDialog(true)}>Add new Shop</Button>
            </Box>
            <Modal onClose={()=>setOpenDialog(false)} open={openDialog} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Container maxWidth="md" sx={{ backgroundColor: (theme)=>theme.palette.background.paper, padding: 3, borderRadius: 3, mx:2 }}>
                    <Typography variant="h6">Add New Shop</Typography>
                    <Box sx={{ p:3 }}>
                        <ShopForm />
                    </Box>
                </Container>
            </Modal>
        </>
    )
}

export default AddShop