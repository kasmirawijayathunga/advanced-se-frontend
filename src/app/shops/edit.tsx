import { Box, Button, Container, Divider, Modal, Typography } from '@mui/material';
import React from 'react'
import ShopForm from './form';

type RowData = {
    id: number;
    shopName: string;
    shopOwnerName: string;
    shopRoute: string;
    shopCategory: string;
};

function EditShop({ data, clearModal, toogleEditMode }:{ data: RowData, clearModal: () => void, toogleEditMode: () => void }) {
  return (
    <>
        <Typography variant="h6">Edit Shop Details</Typography>
        <Box sx={{ py: 2, px:{ md: 3 } }}>
            <ShopForm />
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="outlined" sx={{ mr: 1 }} onClick={toogleEditMode}>Back to View Mode</Button>
            <Button variant="contained" onClick={toogleEditMode}>Update Changes</Button>
        </Box>
    </>
  )
}

export default EditShop