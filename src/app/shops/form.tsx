import { Box, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import LoadingButton from '@mui/lab/LoadingButton';
import { Place } from '@mui/icons-material';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import RadioTextField from '../../components/elements/shops/RadioTextField';

function MapComponent({ position }:{ position:number[] }) {
    const map = useMap()
    useEffect(() => {
        map.panTo({
            lat: position[0],
            lng: position[1]
        })
    },[position])
    return null
}

function ShopForm() {
    const [position, setPosition] = useState([0,0]);
    const [locationLoading, setLocationLoading] = useState(false);

    const handleSubmit = () => {};

    const getLocation = () => {
        if (navigator?.geolocation) {
            setLocationLoading(true);
            navigator.geolocation.getCurrentPosition((currentPosition)=>{ //on success
                console.log(currentPosition);
                setPosition([currentPosition?.coords?.latitude, currentPosition?.coords?.longitude]);

                setLocationLoading(false);
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

    const handleNumberPreference = (textfieldname:string, value:number) => {

    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Shop Name" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Shop Owner Name" />
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth label="Shop Address" />
                </Grid>
                <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
                    <LoadingButton
                        onClick={getLocation}
                        loading={locationLoading}
                        loadingPosition="start"
                        startIcon={<Place />}
                        variant="outlined"
                    >
                    Get Location
                    </LoadingButton>
                    <Typography sx={{ ml:1.5 }}>Location Fetched</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ height: { xs: 200, sm: 300, md: 400 } }}>
                        <MapContainer center={[position[0],position[1]]} zoom={13} style={{ width: "100%", height: "100%" }} scrollWheelZoom={false}>
                            <MapComponent position={position} />
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[position[0],position[1]]}></Marker>
                        </MapContainer>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth label="Email Address" sx={{ maxWidth: 380 }} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <RadioTextField
                        radio1={{ value: 1, active: true, label: "WhatsApp", handleOnClick: handleNumberPreference }}
                        radio2={{ value: 2, active: true, label: "Call", handleOnClick: handleNumberPreference }}
                        radio3={{ value: 3, active: true, label: "Message", handleOnClick: handleNumberPreference }}
                        textFieldProps={{
                            required: true,
                            label: "Mobile Number 1"
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <RadioTextField
                        radio1={{ value: 1, active: false, label: "WhatsApp", handleOnClick: handleNumberPreference }}
                        radio2={{ value: 2, active: false, label: "Call", handleOnClick: handleNumberPreference }}
                        radio3={{ value: 3, active: false, label: "Message", handleOnClick: handleNumberPreference }}
                        textFieldProps={{
                            label: "Mobile Number 2 (Optional)"
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <RadioTextField
                        radio1={{ value: 1, active: false, label: "WhatsApp", handleOnClick: handleNumberPreference }}
                        radio2={{ value: 2, active: false, label: "Call", handleOnClick: handleNumberPreference }}
                        radio3={{ value: 3, active: false, label: "Message", handleOnClick: handleNumberPreference }}
                        textFieldProps={{
                            label: "Mobile Number 3 (Optional)"
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default ShopForm