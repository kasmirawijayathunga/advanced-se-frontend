import React, { useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, IconButton } from '@mui/material'
import { Edit } from '@mui/icons-material'
import useInputs from '../../utils/hooks/useInputs'
import { z } from 'zod'
import Axios from '../../utils/services/Axios'
import { enqueueSnackbar } from 'notistack'
import useLoading from '../../utils/hooks/useLoading'
import Auth from '../../utils/services/Auth'

const InputTemplate = [
    {
        name: 'label',
        value: '',
        schema: z.string().min(1, { message: "Please enter a valid shop type name" })
    }
]

function EditShopTypes({ shopType, onUpdated }: { shopType: { id: string, label: string }, onUpdated: () => void }) {
    const [, setLoading] = useLoading();
    const [open, setOpen] = useState(false);
    const [inputs, { handleInput, handleManualInput }] = useInputs(InputTemplate);

    const handleEditShopType = async () => {
        try {
            setLoading(true);
            const accessToken = await Auth.getAccessToken();
            await Axios.patch(`/data/shoptypes/${shopType.id}`, {
                label: inputs.label
            }, {
                headers: { Authorization: "Bearer " + accessToken }
            });
            enqueueSnackbar("Shop type updated successfully", { variant: "success" });
            setOpen(false);
            onUpdated();
        } catch (err) {
            //@ts-expect-error
            enqueueSnackbar(err?.response?.data?.message ?? "Unexpected error occurred", { variant: "error" });
        } finally {
            setLoading(false);
        }
    };

    const handleOpen = () => {
        handleManualInput({ label: shopType.label });
        setOpen(true);
    }

    return (
        <>
            <IconButton onClick={handleOpen}><Edit /></IconButton>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Edit Shop Type</DialogTitle>
                <DialogContent sx={{ width: 400 }}>
                    <TextField
                        margin="dense"
                        label="Shop Type Name"
                        fullWidth
                        name="label"
                        value={inputs.label}
                        onChange={handleInput}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleEditShopType}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EditShopTypes
