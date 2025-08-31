import { Add } from '@mui/icons-material'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React, { useState } from 'react'

function AddShopType() {
  const [open, setOpen] = useState(false);

  return (
    <>
        <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => setOpen(true)}>Add ShopType</Button>
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
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)} color="primary">Cancel</Button>
                <Button onClick={() => { /* Add shop type logic */ }} color="primary">Add</Button>
            </DialogActions>
        </Dialog>
    </>
  )
}

export default AddShopType