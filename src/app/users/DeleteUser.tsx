import React, { useState } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    IconButton,
    Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Axios from "../../utils/services/Axios";
import { enqueueSnackbar } from "notistack";
import useLoading from "../../utils/hooks/useLoading";
import Auth from "../../utils/services/Auth";

function DeleteUser({
    userId,
    onDeleted,
}: {
    userId: string;
    onDeleted: () => void;
}) {
    const [, setLoading] = useLoading();
    const [open, setOpen] = useState(false);

    const handleDelete = async () => {
        try {
            setLoading(true);
            const accessToken = await Auth.getAccessToken();
            await Axios.delete(`/data/users/${userId}`, {
                headers: { Authorization: "Bearer " + accessToken },
            });
            enqueueSnackbar("User deleted successfully", { variant: "success" });
            setOpen(false);
            onDeleted();
        } catch (err) {
            //@ts-expect-error
            enqueueSnackbar( err?.response?.data?.message ?? "Unexpected error occurred", { variant: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <IconButton color="error" onClick={() => setOpen(true)}>
                <DeleteIcon />
            </IconButton>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Delete User</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this user?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleDelete} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default DeleteUser;
