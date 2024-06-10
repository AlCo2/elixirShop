
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useState } from 'react'
import { FaTrash } from 'react-icons/fa';
import { FiAlertTriangle } from 'react-icons/fi';


function ConfirmDeleteUser({row}) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (choice) => {
        if(choice){
        router.delete('/user/'+row.id);
        }
        setOpen(false);
    };
    return (
        <div>
        <button onClick={handleClickOpen} className='bg-red-600 rounded-md border text-white opacity-70 p-2'><FaTrash className='text-sm'/></button>
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
                Are You sure You want to delete {row.name}
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

export default ConfirmDeleteUser;