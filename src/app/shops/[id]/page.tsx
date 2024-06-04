import { ArrowBack, ChevronLeft } from '@mui/icons-material';
import useScreenSize from '../../../utils/hooks/useScreenSize';
import { Box, Container, Divider, Grid, IconButton, styled, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import useDrawer from '../../../utils/hooks/useDrawer';

import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
import MessageIcon from '@mui/icons-material/Message';
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker } from 'react-leaflet';

const PageBox = styled(Box)({
    maxHeight: `calc(100vh - 84px)`,
    overflow: "auto"
});

function Shop() {
    let { shopId } = useParams();
    const [drawer, setDrawer] = useDrawer();
    const { isSmScreen, isMdScreen } = useScreenSize();
    const [position, setPosition] = useState([6.788456,79.880600]);

  return (
    <PageBox>
        {(isSmScreen || (drawer && isMdScreen)) && (
            <Box sx={{ m:1 }}>
                <IconButton component={Link} to="/shops"><ArrowBack /></IconButton>
            </Box>
        )}
        <Container sx={{ my:3 }} maxWidth="md">
            <Typography variant="h5">Shop Id: #{shopId}</Typography>
            <Divider sx={{ my:2 }} />
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Box>
                        <Typography variant="caption">Route</Typography>
                        <Typography variant="body1">Route Number 01</Typography>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box>
                        <Typography variant="caption">Shop Category</Typography>
                        <Typography variant="body1">Samarasingha Hardware</Typography>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box>
                        <Typography variant="caption">Shop Name</Typography>
                        <Typography variant="body1">Samarasingha Hardware</Typography>
                    </Box>
                </Grid>
                <Grid item xs={6}>
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
                <Grid item xs={4}>
                    <Box>
                        <Typography variant="caption">Latitude</Typography>
                        <Typography variant="body1">6.788456</Typography>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box>
                        <Typography variant="caption">Longitude</Typography>
                        <Typography variant="body1">79.880600</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <MapContainer center={[position[0],position[1]]} zoom={13} style={{ width: "100%", height: 400 }} scrollWheelZoom={false}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[position[0],position[1]]}></Marker>
                    </MapContainer>
                </Grid>
                <Grid item xs={4}>
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
                <Grid item xs={4}>
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
                <Grid item xs={4}>
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
                <Grid item xs={4}>
                    <Box>
                        <Typography variant="caption">Created on</Typography>
                        <Typography variant="body1">04/02/2024 09:44</Typography>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box>
                        <Typography variant="caption">Updated on</Typography>
                        <Typography variant="body1">04/02/2024 09:44</Typography>
                    </Box>
                </Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                    <Box>
                        <Typography variant="caption">Created by</Typography>
                        <Typography variant="body1">Sanju Ranaweera</Typography>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box>
                        <Typography variant="caption">Updated by</Typography>
                        <Typography variant="body1">Sanju Ranaweera</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    </PageBox>
  )
}

export default Shop