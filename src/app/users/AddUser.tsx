import { Add } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, InputLabel, OutlinedInput, TextField } from '@mui/material'
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
    const [inputs, { handleInput, validateInputs, handleManualInput, handleSelect }] = useInputs(InputTemplate);
    const [open, setOpen] = useState(false);

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