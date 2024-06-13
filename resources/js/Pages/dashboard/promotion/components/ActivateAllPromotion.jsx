import { router } from '@inertiajs/react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { useState } from 'react'
import { FaTrash } from 'react-icons/fa';
import { FiAlertTriangle } from 'react-icons/fi';
import { IoCheckmarkOutline } from 'react-icons/io5';

const ActivateAllPromotion = () => {
    const [open, setOpen] = useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (choice) => {
      if(choice){
        router.post('/promotion/activateall');
      }
      setOpen(false);
    };
    return (
      <div>
        <Button size='small' onClick={handleClickOpen} sx={{backgroundColor:'#8bc34a', textTransform:'none'}} color='success' variant='contained'><IoCheckmarkOutline/> Activate All</Button>
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
              Are You sure You want to activate all promotion
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button sx={{color:'#f44336'}} color='error' onClick={()=>handleClose(false)} size='small' variant='outlined'>cancle</Button>
            <Button sx={{backgroundColor:'#8bc34a'}} color='success' variant='contained' size='small' onClick={()=>handleClose(true)} autoFocus>
              Activate
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }


export default ActivateAllPromotion;