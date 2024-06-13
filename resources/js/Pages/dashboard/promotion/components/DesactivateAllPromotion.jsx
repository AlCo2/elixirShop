import { router } from '@inertiajs/react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { useState } from 'react'
import { FaTrash } from 'react-icons/fa';
import { FiAlertTriangle } from 'react-icons/fi';
import { IoCloseOutline } from 'react-icons/io5';

const DesactivateAllPromotion = () => {
    const [open, setOpen] = useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (choice) => {
      if(choice){
        router.post('/promotion/desactivateall');
      }
      setOpen(false);
    };
    return (
      <div>
        <Button size='small' onClick={handleClickOpen} sx={{backgroundColor:'#f44336', textTransform:'none'}} color='error' variant='contained'><IoCloseOutline/>Desactivate All</Button>
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
              Are You sure You want to desactivate all promotion
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


export default DesactivateAllPromotion;