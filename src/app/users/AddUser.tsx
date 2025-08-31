import { Add } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material'
import { useState } from 'react'
import useInputs from '../../utils/hooks/useInputs';
import { z } from 'zod';

const InputTemplate = [
    {
        name: 'name',
        value: '',
        schema: z.string()
    },
    {
        name: 'email',
        value: '',
        schema: z.string().email("Please enter a valid email address")
    },
    {
        name: 'password',
        value: '',
        schema: z.string().min(1, { message: "Please enter a valid password" }) //regex validation is not needed
    },
    {
        name: 'cpassword',
        value: '',
        schema: z.string().min(1, { message: "Please enter a valid password" }) //regex validation is not needed
    }
]

function AddUser() {
    const [open, setOpen] = useState(false);
    const [inputs, { handleInput }] = useInputs(InputTemplate);
    const [selectedRole, setSelectedRole] = useState<string | undefined>();

    const handleAddUser = () => {

    };

    return (
        <>
            <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => setOpen(true)}>Add User</Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add User</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add a new user, please enter their email address here.
                    </DialogContentText>
                    <Grid container spacing={1} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField
                                sx={{ maxWidth: 300 }}
                                autoFocus
                                margin="dense"
                                id="email"
                                label="Email Address"
                                type="email"
                                fullWidth
                                variant="outlined"
                                value={inputs.email}
                                onChange={handleInput}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                sx={{ maxWidth: 300 }}
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Name"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={inputs.name}
                                onChange={handleInput}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <FormControl sx={{ mt: 1 }} fullWidth>
                                <InputLabel>Password</InputLabel>
                                <OutlinedInput
                                    name='password'
                                    label="Password"
                                    type="text"
                                    value={inputs.password}
                                    onChange={handleInput}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <FormControl sx={{ mt: 1 }} fullWidth>
                                <InputLabel>Password</InputLabel>
                                <OutlinedInput
                                    name='cpassword'
                                    label="Confirm Password"
                                    type="text"
                                    value={inputs.cpassword}
                                    onChange={handleInput}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <FormControl sx={{ width: 300, mt: 1 }}>
                                <InputLabel id="label">Role</InputLabel>
                                <Select label="Role" value={selectedRole} onChange={(e)=>setSelectedRole(e.target.value)}>
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

export default AddUser