import { Box, Divider, Grid, Typography, IconButton,  Tooltip, Button } from '@mui/material'
import React from 'react'

import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
import MessageIcon from '@mui/icons-material/Message';
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker } from 'react-leaflet';

type RowData = {
    id: number;
    shopName: string;
    shopOwnerName: string;
    shopRoute: string;
    shopCategory: string;
};

function ViewShop({ data, clearModal, toogleEditMode }:{ data: RowData, clearModal: () => void, toogleEditMode: () => void }) {
    const position = [6.788456,79.880600];
    return (
        <>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <Box>
                    <Typography variant="caption">Route</Typography>
                    <Typography variant="body1">Route Number 01</Typography>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Box>
                    <Typography variant="caption">Shop Category</Typography>
                    <Typography variant="body1">Samarasingha Hardware</Typography>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Box>
                    <Typography variant="caption">Shop Name</Typography>
                    <Typography variant="body1">Samarasingha Hardware</Typography>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Box>
                    <Typography variant="caption">Shop Owner Name</Typography>
                    <Typography variant="body1">Mr. Navam Samarasingha</Typography>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box>
                    <Typography variant="caption">Shop Address</Typography>
                    <Typography variant="body1">No 512/5, Colombo Road, Moratuwa</Typography>
                </Box>
            </Grid>
            <Grid item xs={6} sm={4}>
                <Box>
                    <Typography variant="caption">Latitude</Typography>
                    <Typography variant="body1">6.788456</Typography>
                </Box>
            </Grid>
            <Grid item xs={6} sm={4}>
                <Box>
                    <Typography variant="caption">Longitude</Typography>
                    <Typography variant="body1">79.880600</Typography>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box sx={{ height: { xs: 200, sm: 300, md: 400 } }}>
                    <MapContainer center={[position[0],position[1]]} zoom={13} style={{ width: "100%", height: "100%" }} scrollWheelZoom={false}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[position[0],position[1]]}></Marker>
                    </MapContainer>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box>
                    <Typography variant="caption">Email</Typography>
                    <Typography variant="body1">shardware@mail.com</Typography>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box sx={{ mr: 0.5 }}>
                        <Tooltip title="WhatsApp">
                            <IconButton size="small"><WhatsAppIcon fontSize="small" /></IconButton>
                        </Tooltip>
                    </Box>
                    <Divider orientation="vertical" flexItem sx={{ mr: 1 }} />
                    <Box>
                        <Typography variant="caption">Mobile Number 1</Typography>
                        <Typography variant="body1">+94 77 123 4567</Typography>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box sx={{ mr: 0.5 }}>
                        <Tooltip title="Call">
                            <IconButton size="small"><PhoneIcon fontSize="small" /></IconButton>
                        </Tooltip>
                    </Box>
                    <Divider orientation="vertical" flexItem sx={{ mr: 1 }} />
                    <Box>
                        <Typography variant="caption">Mobile Number 2</Typography>
                        <Typography variant="body1">+94 77 123 4568</Typography>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12} md={4}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box sx={{ mr: 0.5 }}>
                        <Tooltip title="Messaging">
                            <IconButton size="small"><MessageIcon fontSize="small" /></IconButton>
                        </Tooltip>
                    </Box>
                    <Divider orientation="vertical" flexItem sx={{ mr: 1 }} />
                    <Box>
                        <Typography variant="caption">Mobile Number 3</Typography>
                        <Typography variant="body1">+94 77 123 4569</Typography>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Box>
                    <Typography variant="caption">Created on</Typography>
                    <Typography variant="body1">04/02/2024 09:44</Typography>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
                <Box>
                    <Typography variant="caption">Updated on</Typography>
                    <Typography variant="body1">04/02/2024 09:44</Typography>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Box>
                    <Typography variant="caption">Created by</Typography>
                    <Typography variant="body1">Sanju Ranaweera</Typography>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
                <Box>
                    <Typography variant="caption">Updated by</Typography>
                    <Typography variant="body1">Sanju Ranaweera</Typography>
                </Box>
            </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button color="error">Delete</Button>
            <Box>
                <Button variant="outlined" onClick={clearModal} sx={{ mr: 1 }}>Close</Button>
                <Button variant="contained" onClick={toogleEditMode}>Edit</Button>
            </Box>
        </Box>
        </>
    )
}

export default ViewShop