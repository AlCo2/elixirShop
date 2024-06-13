
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
            <FiAlertTriangle color='#f44336'/>
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Are You sure You want to delete {row.firstname +' '+row.lastname}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button color='error' variant='outlined' size='small' onClick={()=>handleClose(false)}>cancle</Button>
            <Button sx={{backgroundColor:'#f44336'}} color='error' variant='contained' size='small' onClick={()=>handleClose(true)} autoFocus>
                Confirm
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}

export default ConfirmDeleteUser;