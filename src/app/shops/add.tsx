import { Box, Button, Container, Divider, IconButton, Modal, Typography } from '@mui/material'
import React, { useState } from 'react'
import ShopForm from './form';
import { Close } from '@mui/icons-material';

function AddShop() {
    const [openDialog, setOpenDialog] = useState(false);
    return (
        <>
            <Box sx={{ my: 2, textAlign: "right" }}>
                <Button variant="contained" onClick={()=>setOpenDialog(true)}>Add new Shop</Button>
            </Box>
            <Modal onClose={()=>setOpenDialog(false)} open={openDialog} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Container sx={{ backgroundColor: (theme)=>theme.palette.background.paper, p: 3, borderRadius: 3, mx:1, maxHeight: "85vh", overflowY: "auto" }} maxWidth="md">
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="h6">Add New Shop</Typography>
                        <IconButton size="small" onClick={()=>setOpenDialog(false)}><Close /></IconButton>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ py: 2, px:{ md: 3 } }}>
                        <ShopForm />
                    </Box>
                </Container>
            </Modal>
        </>
    )
}

export default AddShop