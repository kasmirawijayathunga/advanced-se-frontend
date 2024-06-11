import { Box, Container, Divider, Modal, Typography, IconButton } from '@mui/material'
import React, { useState } from 'react'

import { Close } from '@mui/icons-material';
import ViewShop from './view';
import EditShop from './edit';
import { Shop } from '../../config/shop.types';

function ViewModal({ data, clearModal }:{
    data: Shop
    clearModal: () => void;
}) {
    const [editMode, setEditMode] = useState(false);
    const toogleEditMode = () => setEditMode((prev)=>!prev)
    return (
        <Modal onClose={clearModal} open={data?.id?true:false} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Container sx={{ backgroundColor: (theme)=>theme.palette.background.paper, p: 3, borderRadius: 3, mx:1, maxHeight: "85vh", overflowY: "auto" }} maxWidth="md">
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h5">Shop Id #{data?.id}</Typography>
                    <IconButton size="small" onClick={clearModal}><Close /></IconButton>
                </Box>
                <Divider sx={{ my:2 }} />
                {editMode ? (
                    <EditShop data={data} toogleEditMode={toogleEditMode} clearModal={clearModal} />
                ):(
                    <ViewShop data={data} toogleEditMode={toogleEditMode} clearModal={clearModal} />
                )}
            </Container>
        </Modal>
    )
}

export default ViewModal