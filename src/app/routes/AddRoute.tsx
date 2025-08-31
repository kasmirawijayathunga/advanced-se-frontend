import { Add } from '@mui/icons-material'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React, { useState } from 'react'

function AddRoute() {
  const [open, setOpen] = useState(false);

  return (
    <>
        <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => setOpen(true)}>Add Route</Button>
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Add Route</DialogTitle>
            <DialogContent sx={{ width: 400 }}>
                <TextField
                    sx={{ maxWidth: 300 }}
                    autoFocus
                    margin="dense"
                    id="routeName"
                    label="Route Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                />
                <TextField
                    sx={{ maxWidth: 300, mt: 2 }}
                    margin="dense"
                    id="routeCode"
                    label="Route Code"
                    type="text"
                    fullWidth
                    variant="outlined"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)} color="primary">Cancel</Button>
                <Button onClick={() => { /* Add route logic */ }} color="primary">Add</Button>
            </DialogActions>
        </Dialog>
    </>
  )
}

export default AddRoute
