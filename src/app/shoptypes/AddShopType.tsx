import { Add } from '@mui/icons-material'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React, { useState } from 'react'
import useInputs from '../../utils/hooks/useInputs';
import { z } from 'zod';
import { enqueueSnackbar } from 'notistack';
import useLoading from '../../utils/hooks/useLoading';
import Axios from '../../utils/services/Axios';
import Auth from '../../utils/services/Auth';

const InputTemplate = [
    {
        name: 'label',
        value: '',
        schema: z.string().min(1, { message: "Please enter a valid shop type name" })
    }
]

function AddShopType({ onUpdated }: { onUpdated: () => void }) {
    const [, setLoading] = useLoading();
    const [open, setOpen] = useState(false);
    const [inputs, { handleInput }] = useInputs(InputTemplate);

    const handleAddShopType = async () => {
        try {
            setLoading(true);

            const accessToken = await Auth.getAccessToken();
            await Axios.post("/data/shoptypes", {
                label: inputs.label,
            }, {
                headers: { Authorization: "Bearer " + accessToken }
            });

            enqueueSnackbar("Shop type added successfully", { variant: 'success' });
            setOpen(false);
            onUpdated();
        } catch (err) {
            //@ts-expect-error
            return enqueueSnackbar(err?.response?.data?.message ?? "Unexpected error occurred", { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={() => setOpen(true)}
            >
                Add Shop Type
            </Button>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add Shop Type</DialogTitle>
                <DialogContent sx={{ width: 400 }}>
                    <TextField
                        sx={{ maxWidth: 300 }}
                        autoFocus
                        margin="dense"
                        id="label"
                        label="Shop Type Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        name="label"
                        value={inputs.label}
                        onChange={handleInput}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">Cancel</Button>
                    <Button onClick={handleAddShopType} color="primary">Add</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddShopType
