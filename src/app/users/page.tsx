import { Box, Container, Divider, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { useState } from 'react';
import AddUser from './AddUser';

function Users() {
    const [data, setData] = useState<{ uid: string; name: string; email: string; role: string }[]>([]);

    return (
        <Container maxWidth="xl">
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h4" sx={{ my: 3, fontWeight: 600 }}>Users</Typography>
                <AddUser />
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
                            <TableRow key={user.uid}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell align="right">Actions</TableCell>
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