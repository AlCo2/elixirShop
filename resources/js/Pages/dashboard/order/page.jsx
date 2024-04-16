import React, { useState } from 'react'
import {Container, Grid, Button, Modal, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Chip, IconButton} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { FaPen, FaTrash } from 'react-icons/fa';
import { FiAlertTriangle } from 'react-icons/fi';
import { FaXmark } from 'react-icons/fa6';

const StatusComponent = ({status}) =>{
  switch (status)
  {
    case 1:
      {
        return (
          <Chip size='small' color='warning' label='Pending'/>
        )
      }
    case 2:
      {
        return (
          <Chip size='small' color='success' label='Completed'/>
        )
      }
      break;
    case 3:
      {
        return (
          <Chip size='small' color='error' label='Declined'/>
        )
      }
      break;
  }
}

const columns = [
  { field: 'id', headerName: 'OrderId', width: 200 },
  { field: 'customer', headerName: 'Customer', width: 200 },
  { field: 'total', headerName: 'Total', width: 200 },
  { 
    field: 'status',
    headerName: 'Status', 
    width: 120,
    renderCell: ({row}) =>(
      <StatusComponent status={row.status}/>
    ),
  },
  {
    field: 'action',
    headerName: '',
    width: 100,
    sortable:false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: ({row}) =>(
      <div className='h-full flex gap-2 items-center justify-center'>
        <OrderModelComponent order={row}/>
        <ConfirmDeleteOrder row={row}/>
      </div>
    ),
  }
];
const data = [
  {id:'2131', customer:'abdou lahboub', total:'600DH', status:1},
  {id:'3423', customer:'John Paul', total:'432DH', status:2},
  {id:'2321', customer:'Sandra Bowman', total:'144DH', status:2},
  {id:'5544', customer:'Jimmy Panda', total:'233DH', status:3},
];

const style = {  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 450,
  width:'80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius:2,
  p: 4,
};



function ConfirmDeleteOrder({row}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (choice) => {
    // if(choice){
    //   router.post('/api/deleteproduct/'+row.id);
    // }
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
            Are You sure You want to delete order {row.id}
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



function OrderModelComponent({order}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button onClick={handleOpen} className='bg-liliana-background rounded-md border text-black opacity-70 p-2'><FaPen className='text-sm'/></button>
      <Modal 
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container gap={1}>
            <Grid item xs={12} className='flex justify-between'>
              <p className='font-Poppins font-semibold'>Order #{order.id}</p>
              <IconButton size='small' onClick={handleClose}><FaXmark/></IconButton>
            </Grid>
            <Grid xs={12} md={5.8} item>
                <div>
                    <label className='text-sm font-semibold font-Opensans'>Customer</label>
                </div>
                <input value={order.customer} type="text" className='border-2 rounded-md h-8 focus:outline-blue-400 p-1 text-sm xl:w-full' name="" id="" />
            </Grid>
            <Grid xs={12} md={5.8} item>
                <div>
                    <label className='text-sm font-semibold font-Opensans'>Total</label>
                </div>
                <input value={order.total} type="text" className='border-2 rounded-md h-8 focus:outline-blue-400 p-1 text-sm xl:w-full' name="" id="" />
            </Grid>
            <Grid xs={12} md={5.8} item>
                <div>
                    <label className='text-sm font-semibold font-Opensans'>Status</label>
                </div>
                <select name="role" defaultValue={!order?2:order.status} id="">
                  <option value="1">Pending</option>
                  <option value="2">Completed</option>
                  <option value="3">Declined</option>
                </select>
            </Grid>
            <Grid item sx={{display:'flex', justifyContent:'space-between',flexDirection:'row-reverse'}} xs={12} mt={2}>
              <Button onClick={handleClose} variant='contained' size='small' color='primary' sx={{borderRadius:'0.375rem'}}>Update</Button>
              <Button onClick={handleClose} variant='contained' size='small' color='error' sx={{borderRadius:'0.375rem'}}>Cancle</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

const page = () => {
  return (
    <Container>
      <Grid container mt={4}>
        <Grid item sx={{display:'flex', justifyContent:'right'}} mb={2} xs={12}>
        </Grid>
        <Grid item xs={12}>
          <DataGrid
            sx={{background:'white'}}
            rows={data}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5]}
            // slots={{toolbar:GridToolbar}}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default page;