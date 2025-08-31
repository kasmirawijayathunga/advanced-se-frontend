import { Box, Divider, Grid, Typography, Button } from '@mui/material'

import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker } from 'react-leaflet';
import MapComponent from '../../components/elements/shops/MapComponent';
import MobileNumberView from '../../components/elements/shops/MobileNumberView';
import moment from 'moment';
import { Shop } from '../../config/shop.types';
import Axios from '../../utils/services/Axios';
import { enqueueSnackbar } from 'notistack';
import useLoading from '../../utils/hooks/useLoading';
import Auth from '../../utils/services/Auth';
import { AxiosError } from 'axios';
import useAuthentication from '../../utils/hooks/useAuthentication';
import { BACKEND, BACKEND_URL } from '../../config';

function ViewShop({ data, clearModal, toogleEditMode }:{ data: Shop, clearModal: () => void, toogleEditMode: () => void }) {
    const user = useAuthentication()
    const [loading, setLoading] = useLoading();

    const handleDelete = async () => {
        try{
            const accessToken = await Auth.getAccessToken();
            const response = await Axios.delete(`/shops/${data.id}`,{
                headers: {
                    Authorization: "Bearer " + accessToken
                }
            });
            enqueueSnackbar(`Shop Deleted successfully`, { variant: 'success' });
        } catch (err:any) {
            if(err?.response?.status === 403){
                return enqueueSnackbar("You do not have the permission to delete this shop.", { variant: 'warning' });
            } else {
                return enqueueSnackbar("Unexpected error occoured", { variant: 'warning' });
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <Box>
                    <Typography variant="caption">Route</Typography>
                    <Typography variant="body1">{data.Route.label}</Typography>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Box>
                    <Typography variant="caption">Shop Category</Typography>
                    <Typography variant="body1">{data.Shoptypes.label}</Typography>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Box>
                    <Typography variant="caption">Shop Name</Typography>
                    <Typography variant="body1">{data.name}</Typography>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Box>
                    <Typography variant="caption">Shop Owner Name</Typography>
                    <Typography variant="body1">{data.Customer.name}</Typography>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box>
                    <Typography variant="caption">Shop Address</Typography>
                    <Typography variant="body1">{data.address}</Typography>
                </Box>
            </Grid>
            <Grid item xs={6} sm={4}>
                <Box>
                    <Typography variant="caption">Latitude</Typography>
                    <Typography variant="body1">{data.lattitude}</Typography>
                </Box>
            </Grid>
            <Grid item xs={6} sm={4}>
                <Box>
                    <Typography variant="caption">Longitude</Typography>
                    <Typography variant="body1">{data.longitude}</Typography>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box sx={{ height: { xs: 200, sm: 300, md: 400 } }}>
                    <MapContainer center={[parseFloat(data?.lattitude),parseFloat(data.longitude)]} zoom={13} style={{ width: "100%", height: "100%" }} scrollWheelZoom={false}>
                        <MapComponent position={[parseFloat(data?.lattitude),parseFloat(data.longitude)]} />
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[parseFloat(data?.lattitude),parseFloat(data.longitude)]}></Marker>
                    </MapContainer>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box>
                    <Typography variant="caption">Email</Typography>
                    <Typography variant="body1">{data.email}</Typography>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <MobileNumberView
                    id={1}
                    label={data?.Shops_Phone?.phone1}
                    whatsApp={data?.Shops_Phone?.phone1_whatsapp}
                    call={data?.Shops_Phone?.phone1_call}
                    message={data?.Shops_Phone?.phone1_message}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <MobileNumberView
                    id={2}
                    label={data?.Shops_Phone?.phone2}
                    whatsApp={data?.Shops_Phone?.phone2_whatsapp}
                    call={data?.Shops_Phone?.phone2_call}
                    message={data?.Shops_Phone?.phone2_message}
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <MobileNumberView
                    id={3}
                    label={data?.Shops_Phone?.phone3}
                    whatsApp={data?.Shops_Phone?.phone3_whatsapp}
                    call={data?.Shops_Phone?.phone3_call}
                    message={data?.Shops_Phone?.phone3_message}
                />
            </Grid>
            <Grid container item xs={12}>
                {data?.Shops_Images?.img1 && (
                    <Grid item xs={6} sm={4} lg={12/5} sx={{ position: "relative" }}>
                        <img src={`${BACKEND_URL}/shops/static/uploads/${data.Shops_Images.img1}`} alt="" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                    </Grid>
                )}
                {data?.Shops_Images?.img2 && (
                    <Grid item xs={6} sm={4} lg={12/5} sx={{ position: "relative" }}>
                        <img src={`${BACKEND_URL}/shops/static/uploads/${data.Shops_Images.img2}`} alt="" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                    </Grid>
                )}
                {data?.Shops_Images?.img3 && (
                    <Grid item xs={6} sm={4} lg={12/5} sx={{ position: "relative" }}>
                        <img src={`${BACKEND_URL}/shops/static/uploads/${data.Shops_Images.img3}`} alt="" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                    </Grid>
                )}
                {data?.Shops_Images?.img4 && (
                    <Grid item xs={6} sm={4} lg={12/5} sx={{ position: "relative" }}>
                        <img src={`${BACKEND_URL}/shops/static/uploads/${data.Shops_Images.img4}`} alt="" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                    </Grid>
                )}
                {data?.Shops_Images?.img5 && (
                    <Grid item xs={6} sm={4} lg={12/5} sx={{ position: "relative" }}>
                        <img src={`${BACKEND_URL}/shops/static/uploads/${data.Shops_Images.img5}`} alt="" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                    </Grid>
                )}
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Box>
                    <Typography variant="caption">Created on</Typography>
                    <Typography variant="body1">{moment(data.createdAt).format('LLL')}</Typography>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
                <Box>
                    <Typography variant="caption">Created by</Typography>
                    <Typography variant="body1">{data.User.name}</Typography>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Box>
                    <Typography variant="caption">Updated on</Typography>
                    <Typography variant="body1">{data.Shops_Updates?.[0]?.timestamp ? moment(data.Shops_Updates?.[0]?.timestamp).format('LLL') : "-"}</Typography>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
                <Box>
                    <Typography variant="caption">Updated by</Typography>
                    <Typography variant="body1">{data.Shops_Updates?.[0]?.User?.name??"-"}</Typography>
                </Box>
            </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {user?.role === 1 ? (
                <Button color="error" onClick={handleDelete}>Delete</Button>
            ):(
                <Box></Box>
            )}
            <Box>
                <Button variant="outlined" onClick={clearModal} sx={{ mr: 1 }}>Close</Button>
                <Button variant="contained" onClick={toogleEditMode}>Edit</Button>
            </Box>
        </Box>
        </>
    )
}

export default ViewShop