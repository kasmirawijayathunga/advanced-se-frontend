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
        name: 'name',
        value: '',
        schema: z.string().min(1, { message: "Please enter a valid route name" })
    }
]

function EditRoutes({ route, onUpdated }: { route: { label: string, id: string }, onUpdated: () => void }) {
    const [, setLoading] = useLoading();
    const [open, setOpen] = useState(false);
    const [inputs, { handleInput, handleManualInput }] = useInputs(InputTemplate);

    const handleEditRoute = async () => {
        try {
            setLoading(true);
            const accessToken = await Auth.getAccessToken();
            await Axios.patch(`/data/routes/${route.id}`, {
                label: inputs.name
            }, {
                headers: { Authorization: "Bearer " + accessToken }
            });
            enqueueSnackbar("Route updated successfully", { variant: "success" });
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
        handleManualInput({ "name": route.label });
        setOpen(true);
    }

    return (
        <>
            <IconButton onClick={handleOpen}><Edit /></IconButton>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Edit Route</DialogTitle>
                <DialogContent sx={{ width: 400 }}>
                    <TextField
                        margin="dense"
                        label="Route Name"
                        fullWidth
                        name='name'
                        value={inputs.name}
                        onChange={handleInput}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleEditRoute}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EditRoutes
