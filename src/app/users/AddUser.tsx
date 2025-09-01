import { Add } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material'
import { useState } from 'react'
import useInputs from '../../utils/hooks/useInputs';
import { z } from 'zod';
import { enqueueSnackbar } from 'notistack';
import useLoading from '../../utils/hooks/useLoading';
import Axios from '../../utils/services/Axios';
import Auth from '../../utils/services/Auth';

const InputTemplate = [
    { name: 'name', value: '', schema: z.string().min(1, { message: "Please enter a name" }) },
    { name: 'email', value: '', schema: z.string().email("Please enter a valid email address") },
    { name: 'password', value: '', schema: z.string().min(6, { message: "Password must be at least 6 characters" }) },
    { name: 'cpassword', value: '', schema: z.string().min(6, { message: "Password must be at least 6 characters" }) }
]

function AddUser({ onUpdated }: { onUpdated: () => void }) {
    const [, setLoading] = useLoading();
    const [open, setOpen] = useState(false);
    const [inputs, { handleInput }] = useInputs(InputTemplate);
    const [selectedRole, setSelectedRole] = useState<string | undefined>();

    const handleAddUser = async () => {
        try {
            setLoading(true);

            if (inputs.password !== inputs.cpassword) {
                return enqueueSnackbar("Passwords do not match", { variant: 'error' });
            }

            const accessToken = await Auth.getAccessToken();
            await Axios.post("/data/users", {
                name: inputs.name,
                email: inputs.email,
                password: inputs.password,
                role: selectedRole
            }, {
                headers: { Authorization: "Bearer " + accessToken }
            });

            enqueueSnackbar("User added successfully", { variant: 'success' });
            setOpen(false);
            onUpdated();
        } catch (err) {
            //@ts-expect-error
            enqueueSnackbar(err?.response?.data?.message ?? "Unexpected error occurred", { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => setOpen(true)}>Add User</Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add User</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add a new user, please enter their details below.
                    </DialogContentText>
                    <Grid container spacing={1} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField
                                sx={{ maxWidth: 300 }}
                                autoFocus
                                margin="dense"
                                label="Name"
                                type="text"
                                fullWidth
                                variant="outlined"
                                name="name"
                                value={inputs.name}
                                onChange={handleInput}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                sx={{ maxWidth: 300 }}
                                margin="dense"
                                label="Email Address"
                                type="email"
                                fullWidth
                                variant="outlined"
                                name="email"
                                value={inputs.email}
                                onChange={handleInput}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <FormControl sx={{ mt: 1 }} fullWidth>
                                <InputLabel>Password</InputLabel>
                                <OutlinedInput
                                    name="password"
                                    label="Password"
                                    type="password"
                                    value={inputs.password}
                                    onChange={handleInput}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <FormControl sx={{ mt: 1 }} fullWidth>
                                <InputLabel>Confirm Password</InputLabel>
                                <OutlinedInput
                                    name="cpassword"
                                    label="Confirm Password"
                                    type="password"
                                    value={inputs.cpassword}
                                    onChange={handleInput}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <FormControl sx={{ width: 300, mt: 1 }}>
                                <InputLabel id="role-label">Role</InputLabel>
                                <Select
                                    labelId="role-label"
                                    value={selectedRole ?? ""}
                                    onChange={(e) => setSelectedRole(e.target.value)}
                                >
                                    <MenuItem value="1">Admin</MenuItem>
                                    <MenuItem value="2">User</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleAddUser}>Add User</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddUser;