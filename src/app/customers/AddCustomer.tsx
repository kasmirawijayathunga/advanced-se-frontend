import { Add } from '@mui/icons-material'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React, { useState } from 'react'

function AddCustomer() {
  const [open, setOpen] = useState(false);

  return (
    <>
        <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => setOpen(true)}>Add Customer</Button>
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Add Customer</DialogTitle>
            <DialogContent sx={{ width: 400 }}>
                <TextField
                    sx={{ maxWidth: 300 }}
                    autoFocus
                    margin="dense"
                    id="customerName"
                    label="Customer Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                />
                <TextField
                    sx={{ maxWidth: 300, mt: 2 }}
                    margin="dense"
                    id="customerEmail"
                    label="Customer Email"
                    type="email"
                    fullWidth
                    variant="outlined"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)} color="primary">Cancel</Button>
                <Button onClick={() => { /* Add customer logic */ }} color="primary">Add</Button>
            </DialogActions>
        </Dialog>
    </>
  )
}

export default AddCustomer
