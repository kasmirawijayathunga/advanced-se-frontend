import { Box, Container, Divider, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import AddRoute from './AddRoute';
import Auth from '../../utils/services/Auth';
import Axios from '../../utils/services/Axios';

import DeleteIcon from "@mui/icons-material/Delete";
import { Edit } from '@mui/icons-material'
import moment from 'moment';

function Routes() {
    const [data, setData] = useState<{ id: string; label: string; createdAt: string }[]>([]);

    const fetchData = async () => {
        const accessToken = await Auth.getAccessToken();
        const response = await Axios.get("/data/routes", {
            headers: {
                Authorization: "Bearer " + accessToken
            }
        });
        setData(response.data?.result);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Container maxWidth="xl">
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h4" sx={{ my: 3, fontWeight: 600 }}>Routes</Typography>
                <AddRoute />
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Table sx={{ minWidth: 650 }} aria-label="routes table">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>createdAt</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                {data && data.length > 0 ? (
                    <TableBody>
                        {data.map((route, index) => (
                            <TableRow key={route.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{route.label}</TableCell>
                                <TableCell>{moment(route.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</TableCell>
                                <TableCell align="right">
                                    <IconButton>
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                ) : (
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={5}>No data available</TableCell>
                        </TableRow>
                    </TableBody>
                )}
            </Table>
        </Container>
    );
}

export default Routes;