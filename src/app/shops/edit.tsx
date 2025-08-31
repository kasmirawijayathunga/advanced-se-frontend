import { Box, Typography } from '@mui/material';
import ShopForm from './form';
import { Shop } from '../../config/shop.types';

function EditShop({ data, clearModal, toogleEditMode }:{ data: Shop, clearModal: () => void, toogleEditMode: () => void }) {
  return (
    <>
        <Typography variant="h6">Edit Shop Details</Typography>
        <Box sx={{ py: 2, px:{ md: 3 } }}>
            <ShopForm editMode={true} data={data} onClose={clearModal} onBack={toogleEditMode} />
        </Box>
    </>
  )
}

export default EditShop