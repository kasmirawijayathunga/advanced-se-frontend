import { Autocomplete, Box, Button, ButtonBase, Divider, FormControl, Grid, IconButton, ImageList, ImageListItem, InputLabel, MenuItem, Select, styled, TextField, Typography } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
import LoadingButton from '@mui/lab/LoadingButton';
import { Close, Place } from '@mui/icons-material';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import RadioTextField from '../../components/elements/shops/RadioTextField';
import MapComponent from '../../components/elements/shops/MapComponent';
import Axios from '../../utils/services/Axios';
import { data_consts, Shop } from '../../config/shop.types';
import useInputs from '../../utils/hooks/useInputs';
import { z } from 'zod';
import useLoading from '../../utils/hooks/useLoading';
import { enqueueSnackbar } from 'notistack';
import Auth from '../../utils/services/Auth';
import { BACKEND_URL, MIN_LOCATION_ACCURACY } from '../../config';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CreateForm from '../../utils/services/CreateForm';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const InputTemplate = [
    {
      name: 'route',
      value: '',
      schema: z.string()
    },
    {
      name: 'shopcategory',
      value: '',
      schema: z.string()
    },
    {
      name: 'name',
      value: '',
      schema: z.string()
    },
    {
      name: 'owner',
      value: { name: '', id: '' }
    },
    {
      name: 'address',
      value: '',
      schema: z.string()
    },
    {
      name: 'latitude',
      value: '',
      schema: z.number()
    },
    {
      name: 'longitude',
      value: '',
      schema: z.number()
    },
    {
      name: 'email',
      value: '',
      schema: z.string().email("Please enter a valid email address")
    },
    {
      name: 'phone1',
      value: '',
      schema: z.string()
    },
    {
      name: 'phone2',
      value: '',
      schema: z.string()
    },
    {
      name: 'phone3',
      value: '',
      schema: z.string()
    },
    {
      name: 'whatsapp',
      value: 1,
      schema: z.number()
    },
    {
      name: 'call',
      value: 1,
      schema: z.number()
    },
    {
      name: 'message',
      value: 1,
      schema: z.number()
    },
    {
      name: 'img1',
      value: undefined,
      schema: z.string()
    },
    {
      name: 'img2',
      value: undefined,
      schema: z.string()
    },
    {
      name: 'img3',
      value: undefined,
      schema: z.string()
    },
    {
      name: 'img4',
      value: undefined,
      schema: z.string()
    },
    {
      name: 'img5',
      value: undefined,
      schema: z.string()
    },
]

function ShopForm({ editMode, data, onClose, onBack }:{ editMode: boolean, data?: Shop, onClose: () => void, onBack: () => void }) {
    const [loading, setLoading] = useLoading();

    const [inputs, { handleInput, validateInputs, handleManualInput, handleSelect }] = useInputs(InputTemplate);
    const [input_file1, setInput_file1] = useState<File>();
    const [input_file2, setInput_file2] = useState<File>();
    const [input_file3, setInput_file3] = useState<File>();
    const [input_file4, setInput_file4] = useState<File>();
    const [input_file5, setInput_file5] = useState<File>();

    const [data_consts, setData_consts] = useState<data_consts>({
        customers: [],
        shoptypes: [],
        routes: []
    });
    const [locationLoading, setLocationLoading] = useState(false);

    const fetchConsts = async () => {
        const accessToken = await Auth.getAccessToken();
        const response = await Axios.get("/shops/data",{
            headers: {
                Authorization: "Bearer " + accessToken
            }
        })
        setData_consts(response.data?.result);
    };
    useEffect(()=>{
        fetchConsts().then(() => {
            if(data){
                handleManualInput({
                    "route": data.Route.id,
                    "shopcategory": data.Shoptypes.id,
                    "name": data.name,
                    "owner": {
                        "id": data.Customer.id,
                        "name": data.Customer.name
                    },
                    "address": data.address,
                    "latitude": parseFloat(data.lattitude),
                    "longitude": parseFloat(data.longitude),
                    "email": data.email,
                    "phone1": data.Shops_Phone.phone1,
                    "phone2": data.Shops_Phone.phone2,
                    "phone3": data.Shops_Phone.phone3,
                    "whatsapp": data.Shops_Phone.phone1_whatsapp ? 1 : data.Shops_Phone.phone2_whatsapp ? 2 : 3,
                    "call": data.Shops_Phone.phone1_call ? 1 : data.Shops_Phone.phone2_call ? 2 : 3,
                    "message": data.Shops_Phone.phone1_message ? 1 : data.Shops_Phone.phone2_message ? 2 : 3,
                    "img1": data?.Shops_Images?.img1 ?? "",
                    "img2": data?.Shops_Images?.img2 ?? "",
                    "img3": data?.Shops_Images?.img3 ?? "",
                    "img4": data?.Shops_Images?.img4 ?? "",
                    "img5": data?.Shops_Images?.img5 ?? "",
                })
            }
        });
    },[])

    const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            // const validated = validateInputs(inputs, InputTemplate);
            // if(validated){}

            const reqData = {
                "name": inputs.name,
                "address": inputs.address,
                "longitude": inputs.longitude.toString(),
                "latitude": inputs.latitude.toString(),
                "email": inputs.email,
            
                "phone1": inputs.phone1,
                "phone1_whatsapp": inputs.whatsapp === 1,
                "phone1_call": inputs.call === 1,
                "phone1_message": inputs.message === 1,
                "phone2": inputs.phone2,
                "phone2_whatsapp": inputs.whatsapp === 2,
                "phone2_call": inputs.call === 2,
                "phone2_message": inputs.message === 2,
                "phone3": inputs.phone3,
                "phone3_whatsapp": inputs.whatsapp === 3,
                "phone3_call": inputs.call === 3,
                "phone3_message": inputs.message === 3,
            
                "customer_id": inputs.owner.id,
                "route_id": inputs.route,
                "type_id": inputs.shopcategory
            }

            const formData = await CreateForm(reqData);

            if(editMode){
                formData.append("removedImg", JSON.stringify({
                    img1: !input_file1 && inputs.img1 === null,
                    img2: !input_file2 && inputs.img2 === null,
                    img3: !input_file3 && inputs.img3 === null,
                    img4: !input_file4 && inputs.img4 === null,
                    img5: !input_file5 && inputs.img5 === null
                }))
            }

            if(input_file1){
                formData.append("img1", input_file1 ?? inputs.img1);
            }
            if(input_file2){
                formData.append("img2", input_file2 ?? inputs.img2)
            }
            if(input_file3){
                formData.append("img3", input_file3 ?? inputs.img3)
            }
            if(input_file4){
                formData.append("img4", input_file4 ?? inputs.img4)
            }
            if(input_file5){
                formData.append("img5", input_file5 ?? inputs.img5)
            }
      
            const accessToken = await Auth.getAccessToken();
            const response = editMode ? await Axios.patch(`/shops/${data?.id}`, formData, {
                headers: {
                    Authorization: "Bearer " + accessToken,
                    'Content-Type': 'multipart/form-data'
                }
            }) : await Axios.post('/shops', formData, {
                headers: {
                    Authorization: "Bearer " + accessToken,
                    'Content-Type': 'multipart/form-data'
                }
            });
            // console.log(response?.data);
            enqueueSnackbar(`Shop ${editMode ? 'Edited' : 'Added'} successfully`, { variant: 'success' });

            window.location.reload();

        } catch (err) {
            //@ts-expect-error
            return enqueueSnackbar(err?.response?.data?.message ?? "Unexpected error occoured", { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const getLocation = () => {
        if (navigator?.geolocation) {
            setLocationLoading(true);
            navigator.geolocation.getCurrentPosition((currentPosition)=>{
                //on get location success
                console.log(currentPosition);
                if(currentPosition.coords.accuracy <= MIN_LOCATION_ACCURACY){
                    handleManualInput({
                        latitude: currentPosition?.coords?.latitude,
                        longitude: currentPosition?.coords?.longitude
                    })
                } else {
                    enqueueSnackbar("Your location accuracy is not sufficient, please try again", { variant: 'warning' });
                }
                setLocationLoading(false);
            },
            (error)=>{
                //on get location error
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        enqueueSnackbar("User denied the request for Geolocation", { variant: 'warning' });
                        break;
                    case error.POSITION_UNAVAILABLE:
                        enqueueSnackbar("Location information is unavailable", { variant: 'warning' });
                        break;
                    case error.TIMEOUT:
                        enqueueSnackbar("The request to get user location timed out", { variant: 'warning' });
                        break;
                    default:
                        enqueueSnackbar("Unable to retrieve your location", { variant: 'warning' });
                        break;
                  }
            },{
                enableHighAccuracy: true
            });
        } else {
            enqueueSnackbar("Geolocation not supported", { variant: 'error' });
        }
    };

    const handleFileInput1 = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target?.files){
            setInput_file1(e.target.files[0]);
        }
    };
    const handleFileInput2 = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target?.files){
            setInput_file2(e.target.files[0]);
        }
    };
    const handleFileInput3 = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target?.files){
            setInput_file3(e.target.files[0]);
        }
    };
    const handleFileInput4 = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target?.files){
            setInput_file4(e.target.files[0]);
        }
    };
    const handleFileInput5 = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target?.files){
            setInput_file5(e.target.files[0]);
        }
    };

    const handleRemoveImage = (value:number) => {
        switch (value) {
            case 1:
                setInput_file1(undefined);
                handleManualInput({ img1: inputs.img1 ? null : undefined });
                break;
            case 2:
                setInput_file2(undefined);
                handleManualInput({ img2: inputs.img2 ? null : undefined });
                break;
            case 3:
                setInput_file3(undefined);
                handleManualInput({ img3: inputs.img3 ? null : undefined });
                break;
            case 4:
                setInput_file4(undefined);
                handleManualInput({ img4: inputs.img4 ? null : undefined });
                break;
            case 5:
                setInput_file5(undefined);
                handleManualInput({ img5: inputs.img5 ? null : undefined });
                break;
            default:
                break;
            
        }
    }

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel>Shop Route</InputLabel>
                        <Select
                            name="route"
                            value={inputs.route}
                            onChange={handleSelect}
                            label="Shop Route"
                        >
                            {data_consts?.routes?.map((route) => <MenuItem key={route.id} value={route.id}>{route.label}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel>Shop Category</InputLabel>
                        <Select
                            name="shopcategory"
                            value={inputs.shopcategory}
                            onChange={handleSelect}
                            label="Shop Category"
                        >
                            {data_consts?.shoptypes?.map((type) => <MenuItem key={type.id} value={type.id}>{type.label}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Shop Name"
                        name="name"
                        value={inputs.name}
                        onChange={handleInput}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Autocomplete fullWidth
                        onChange={(e,value)=>handleManualInput({ owner: value })}
                        value={inputs.owner}
                        disablePortal
                        options={data_consts?.customers}
                        getOptionLabel={(option:{ name:string })=>option.name}
                        renderInput={(params) => <TextField {...params} label="Shop Owner Name" />}
                        isOptionEqualToValue={(option, value) => option.name === value.name}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth label="Shop Address"
                        name='address'
                        value={inputs.address}
                        onChange={handleInput}
                    />
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
                    {inputs.latitude && (<Typography sx={{ ml:1.5, color: (theme)=>theme.palette.success.main }}>✔ Location Fetched</Typography>)}
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ height: { xs: 200, sm: 300, md: 400 } }}>
                        <MapContainer center={[inputs.latitude,inputs.longitude]} zoom={13} style={{ width: "100%", height: "100%" }} scrollWheelZoom={false}>
                            <MapComponent position={[inputs.latitude,inputs.longitude]} />
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[inputs.latitude,inputs.longitude]}></Marker>
                        </MapContainer>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth label="Email Address" sx={{ maxWidth: 380 }}
                        name="email"
                        value={inputs.email}
                        onChange={handleInput}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <RadioTextField
                        radio1={{ value: 1, active: inputs.whatsapp === 1, label: "WhatsApp", handleOnClick: () => handleManualInput({ whatsapp: 1 }) }}
                        radio2={{ value: 2, active: inputs.call === 1, label: "Call", handleOnClick: () => handleManualInput({ call: 1 }) }}
                        radio3={{ value: 3, active: inputs.message === 1, label: "Message", handleOnClick: () => handleManualInput({ message: 1 }) }}
                        textFieldProps={{
                            label: "Mobile Number 1",
                            name: "phone1",
                            value: inputs.phone1,
                            onChange: handleInput
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <RadioTextField
                        radio1={{ value: 1, active: inputs.whatsapp === 2, label: "WhatsApp", handleOnClick: () => handleManualInput({ whatsapp: 2 }) }}
                        radio2={{ value: 2, active: inputs.call === 2, label: "Call", handleOnClick: () => handleManualInput({ call: 2 }) }}
                        radio3={{ value: 3, active: inputs.message === 2, label: "Message", handleOnClick: () => handleManualInput({ message: 2 }) }}
                        textFieldProps={{
                            label: "Mobile Number 2 (Optional)",
                            name: "phone2",
                            value: inputs.phone2,
                            onChange: handleInput
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <RadioTextField
                        radio1={{ value: 1, active: inputs.whatsapp === 3, label: "WhatsApp", handleOnClick: () => handleManualInput({ whatsapp: 3 }) }}
                        radio2={{ value: 2, active: inputs.call === 3, label: "Call", handleOnClick: () => handleManualInput({ call: 3 }) }}
                        radio3={{ value: 3, active: inputs.message === 3, label: "Message", handleOnClick: () => handleManualInput({ message: 3 })}}
                        textFieldProps={{
                            label: "Mobile Number 3 (Optional)",
                            name: "phone3",
                            value: inputs.phone3,
                            onChange: handleInput
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    <>
                        {(input_file1 || (editMode && inputs?.img1)) ? (
                            <Box sx={{ flex:1, position: "relative" }}>
                                <IconButton size="small" onClick={()=>handleRemoveImage(1)} sx={{ position: "absolute", right: 2, top: 2,backgroundColor: "#ffffff66" }}><Close fontSize="small" /></IconButton>
                                <img src={input_file1 ? URL.createObjectURL(input_file1!) : `${BACKEND_URL}/shops/static/uploads/${inputs.img1}`} alt="" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                            </Box>
                        ):(
                            <ButtonBase component="label" sx={{ flexDirection: "column", backgroundColor: (theme)=>theme.palette.grey[300], flex: 1, alignItems: "center", justifyContent: "center", height: 100 }}>
                                <CloudUploadIcon />
                                <Typography>Add Image</Typography>
                                <VisuallyHiddenInput onChange={handleFileInput1} type="file" />
                            </ButtonBase>
                        )}
                    </>
                    <>
                        {(input_file2 || (editMode && inputs?.img2)) ? (
                            <Box sx={{ flex:1, position: "relative" }}>
                                <IconButton size="small" onClick={()=>handleRemoveImage(2)} sx={{ position: "absolute", right: 2, top: 2,backgroundColor: "#ffffff66" }}><Close fontSize="small" /></IconButton>
                                <img src={input_file2 ? URL.createObjectURL(input_file2!) : `${BACKEND_URL}/shops/static/uploads/${inputs.img2}`} alt="" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                            </Box>
                        ):(
                            <ButtonBase component="label" sx={{ flexDirection: "column", backgroundColor: (theme)=>theme.palette.grey[300], flex: 1, alignItems: "center", justifyContent: "center" }}>
                                <CloudUploadIcon />
                                <Typography>Add Image</Typography>
                                <VisuallyHiddenInput onChange={handleFileInput2} type="file" />
                            </ButtonBase>
                        )}
                    </>
                    <>
                        {(input_file3 || (editMode && inputs?.img3)) ? (
                            <Box sx={{ flex:1, position: "relative" }}>
                                <IconButton size="small" onClick={()=>handleRemoveImage(3)} sx={{ position: "absolute", right: 2, top: 2,backgroundColor: "#ffffff66" }}><Close fontSize="small" /></IconButton>
                                <img src={input_file3 ? URL.createObjectURL(input_file3!) : `${BACKEND_URL}/shops/static/uploads/${inputs.img3}`} alt="" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                            </Box>
                        ):(
                            <ButtonBase component="label" sx={{ flexDirection: "column", backgroundColor: (theme)=>theme.palette.grey[300], flex: 1, alignItems: "center", justifyContent: "center" }}>
                                <CloudUploadIcon />
                                <Typography>Add Image</Typography>
                                <VisuallyHiddenInput onChange={handleFileInput3} type="file" />
                            </ButtonBase>
                        )}
                    </>
                    <>
                        {(input_file4 || (editMode && inputs?.img4)) ? (
                            <Box sx={{ flex:1, position: "relative" }}>
                                <IconButton size="small" onClick={()=>handleRemoveImage(4)} sx={{ position: "absolute", right: 2, top: 2,backgroundColor: "#ffffff66" }}><Close fontSize="small" /></IconButton>
                                <img src={input_file4 ? URL.createObjectURL(input_file4!) : `${BACKEND_URL}/shops/static/uploads/${inputs.img4}`} alt="" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                            </Box>
                        ):(
                            <ButtonBase component="label" sx={{ flexDirection: "column", backgroundColor: (theme)=>theme.palette.grey[300], flex: 1, alignItems: "center", justifyContent: "center" }}>
                                <CloudUploadIcon />
                                <Typography>Add Image</Typography>
                                <VisuallyHiddenInput onChange={handleFileInput4} type="file" />
                            </ButtonBase>
                        )}
                    </>
                    <>
                        {(input_file5 || (editMode && inputs?.img5)) ? (
                            <Box sx={{ flex:1, position: "relative" }}>
                                <IconButton size="small" onClick={()=>handleRemoveImage(5)} sx={{ position: "absolute", right: 2, top: 2,backgroundColor: "#ffffff66" }}><Close fontSize="small" /></IconButton>
                                <img src={input_file5 ? URL.createObjectURL(input_file5!) : `${BACKEND_URL}/shops/static/uploads/${inputs.img5}`} alt="" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                            </Box>
                        ):(
                            <ButtonBase component="label" sx={{ flexDirection: "column", backgroundColor: (theme)=>theme.palette.grey[300], flex: 1, alignItems: "center", justifyContent: "center" }}>
                                <CloudUploadIcon />
                                <Typography>Add Image</Typography>
                                <VisuallyHiddenInput onChange={handleFileInput5} type="file" />
                            </ButtonBase>
                        )}
                    </>
                </Box>
                </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="outlined" sx={{ mr: 1 }} onClick={onBack}>{editMode ? 'Back to View Mode' : "Close"}</Button>
                <Button variant="contained" type="submit">{editMode ? 'Update Changes' : "Add Shop"}</Button>
            </Box>
        </Box>
    )
}

export default ShopForm
