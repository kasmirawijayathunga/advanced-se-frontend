import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'

function ShopForm() {
    const [position, setPosition] = useState([6.788456,79.880600]);

    const handleSubmit = () => {};

    const getLocation = () => {
        if (navigator?.geolocation) {
            navigator.geolocation.getCurrentPosition((currentPosition)=>{ //on success
                console.log(currentPosition);
            },
            (error)=>{ //on error
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                      //x.innerHTML = "User denied the request for Geolocation."
                      break;
                    case error.POSITION_UNAVAILABLE:
                      //x.innerHTML = "Location information is unavailable."
                      break;
                    case error.TIMEOUT:
                      //x.innerHTML = "The request to get user location timed out."
                      break;
                    default:
                      //x.innerHTML = "An unknown error occurred."
                      break;
                  }
                  console.log(error)
                console.log("Unable to retrieve your location");
            },{
                enableHighAccuracy: true
            });
        } else {
            console.log("Geolocation not supported");
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel>Shop Route</InputLabel>
                        <Select
                            label="Shop Route"
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel>Shop Category</InputLabel>
                        <Select
                            label="Shop Category"
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth label="Shop Name" />
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth label="Shop Owner Name" />
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth label="Shop Address" />
                </Grid>
                <Button onClick={getLocation}>Get Location</Button>
            </Grid>
        </Box>
    )
}

export default ShopForm