import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import React from "react";

const DeleteCustomerDialog = ({
    title,
    open,
    onClose,
    question,
    selectedCustomer,
    onConfirm,
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title ? title : "Delete Customer"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {question
                        ? question
                        : `Do you want to delete this customer
                    : ${selectedCustomer?.customer_id}?`}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button
                    onClick={onConfirm}
                    color="secondary"
                    variant="contained"
                    autoFocus
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteCustomerDialog;
