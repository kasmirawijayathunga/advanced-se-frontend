import React, { useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, IconButton, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { Edit } from '@mui/icons-material'
import useInputs from '../../utils/hooks/useInputs'
import { z } from 'zod'
import Axios from '../../utils/services/Axios'
import { enqueueSnackbar } from 'notistack'
import useLoading from '../../utils/hooks/useLoading'
import Auth from '../../utils/services/Auth'

const InputTemplate = [
    { name: 'name', value: '', schema: z.string().min(1, { message: "Please enter a valid name" }) },
    { name: 'email', value: '', schema: z.string().email("Please enter a valid email") },
    { name: 'password', value: '', schema: z.string().optional() },
    { name: 'cpassword', value: '', schema: z.string().optional() }
]

function EditUser({ user, onUpdated }: { user: any, onUpdated: () => void }) {
    const [, setLoading] = useLoading();
    const [open, setOpen] = useState(false);
    const [inputs, { handleInput, handleManualInput }] = useInputs(InputTemplate);
    const [selectedRole, setSelectedRole] = useState<string>(user?.User_Role?.id || '');

    const handleEditUser = async () => {
        try {
            setLoading(true);

            // validate password if provided
            if (inputs.password || inputs.cpassword) {
                if (inputs.password !== inputs.cpassword) {
                    return enqueueSnackbar("Passwords do not match", { variant: "error" });
                }
            }

            const accessToken = await Auth.getAccessToken();
            await Axios.patch(`/data/users/${user.id}`, {
                name: inputs.name,
                email: inputs.email,
                role: selectedRole,
                ...(inputs.password ? { password: inputs.password } : {})
            }, {
                headers: { Authorization: "Bearer " + accessToken }
            });

            enqueueSnackbar("User updated successfully", { variant: "success" });
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
        handleManualInput({
            name: user.name,
            email: user.email,
            password: "",
            cpassword: ""
        });
        setSelectedRole(user?.User_Role?.id ?? '');
        setOpen(true);
    }

    return (
        <>
            <IconButton onClick={handleOpen}><Edit /></IconButton>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent sx={{ width: 400 }}>
                    <TextField
                        margin="dense"
                        label="Name"
                        fullWidth
                        variant="outlined"
                        name="name"
                        value={inputs.name}
                        onChange={handleInput}
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="outlined"
                        name="email"
                        value={inputs.email}
                        onChange={handleInput}
                    />
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel id="role-label">Role</InputLabel>
                        <Select
                            labelId="role-label"
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                        >
                            <MenuItem value="1">Admin</MenuItem>
                            <MenuItem value="2">User</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Optional password fields */}
                    <TextField
                        margin="dense"
                        label="New Password (leave blank to keep current)"
                        type="password"
                        fullWidth
                        variant="outlined"
                        name="password"
                        value={inputs.password}
                        onChange={handleInput}
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        margin="dense"
                        label="Confirm New Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        name="cpassword"
                        value={inputs.cpassword}
                        onChange={handleInput}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleEditUser}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EditUser