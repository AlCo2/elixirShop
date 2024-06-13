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
            <FiAlertTriangle color='#f44336'/>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are You sure You want to desactivate all promotion
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button sx={{color:'#f44336'}} color='error' onClick={()=>handleClose(false)} size='small' variant='outlined'>cancle</Button>
            <Button sx={{backgroundColor:'#f44336'}} color='success' variant='contained' size='small' onClick={()=>handleClose(true)} autoFocus>
              Desactivate
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }


export default DesactivateAllPromotion;