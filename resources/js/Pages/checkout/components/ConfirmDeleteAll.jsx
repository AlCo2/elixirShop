import { router } from '@inertiajs/react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import { useState } from 'react'
import { FaTrash } from 'react-icons/fa';
import { FiAlertTriangle } from 'react-icons/fi';

const ConfirmDeleteAll = ({deleteAll}) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (choice) => {
        if(choice){
            deleteAll();
        }
        setOpen(false);
    };
    return (
        <div>
        <IconButton sx={{my:2}} onClick={handleClickOpen} size='small' color='error'><FaTrash/></IconButton>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            <FiAlertTriangle/>
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Are You sure You want to delete all products from cart
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={()=>handleClose(false)}>cancle</Button>
            <Button onClick={()=>handleClose(true)} autoFocus>
                Confirm
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}


export default ConfirmDeleteAll;