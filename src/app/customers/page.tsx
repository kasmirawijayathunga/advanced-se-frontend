import { Box, Container, Divider, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import AddCustomer from './AddCustomer';
import Auth from '../../utils/services/Auth';
import Axios from '../../utils/services/Axios';

import DeleteIcon from "@mui/icons-material/Delete";
import { Edit } from '@mui/icons-material'
import moment from 'moment';
import EditCustomers from './EditCustomers';
import DeleteCustomers from './DeleteCustomers';

function Customers() {
    const [data, setData] = useState<{ id: string; name: string; createdAt: string }[]>([]);

    const fetchData = async () => {
        const accessToken = await Auth.getAccessToken();
        const response = await Axios.get("/data/customers", {
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
                <Typography variant="h4" sx={{ my: 3, fontWeight: 600 }}>Customers</Typography>
                <AddCustomer onUpdated={fetchData} />
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Table sx={{ minWidth: 650 }} aria-label="customers table">
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
                        {data.map((customer, index) => (
                            <TableRow key={customer.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{customer.name}</TableCell>
                                <TableCell>{moment(customer.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</TableCell>
                                <TableCell align="right">
                                    <EditCustomers customer={customer} onUpdated={fetchData} />
                                    <DeleteCustomers customerId={customer.id} onDeleted={fetchData} />
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

export default Customers;