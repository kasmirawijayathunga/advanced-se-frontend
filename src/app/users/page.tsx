import { Box, Container, Divider, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import AddUser from './AddUser';
import Auth from '../../utils/services/Auth';
import Axios from '../../utils/services/Axios';

import EditUser from './EditUser';
import DeleteUser from './DeleteUser';

function Users() {
    const [data, setData] = useState<{ id: string; name: string; email: string; User_Role: { id: string; label: string } }[]>([]);

    const fetchData = async () => {
        const accessToken = await Auth.getAccessToken();
        const response = await Axios.get("/data/users",{
            headers: {
                Authorization: "Bearer " + accessToken
            }
        })
        setData(response.data?.result);
    };

    useEffect(()=>{
        fetchData()
    },[])

    return (
        <Container maxWidth="xl">
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h4" sx={{ my: 3, fontWeight: 600 }}>Users</Typography>
                <AddUser onUpdated={fetchData} />
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                {data && data.length > 0 ? (
                    <TableBody>
                        {data.map((user, index) => (
                            <TableRow key={user.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.User_Role.label}</TableCell>
                                <TableCell align="right">
                                    <EditUser user={user} onUpdated={fetchData} />
                                    <DeleteUser userId={user.id} onDeleted={fetchData} />
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
    )
}

export default Users