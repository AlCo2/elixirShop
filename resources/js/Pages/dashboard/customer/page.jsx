import React, { useState } from 'react'
import {Container, Grid, Button, Modal, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Select, MenuItem, IconButton} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { FaPen, FaTrash } from 'react-icons/fa';
import { FiAlertTriangle } from 'react-icons/fi';
import { FaXmark } from 'react-icons/fa6';


const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstname', headerName: 'FirstName', width: 130 },
  { field: 'lastname', headerName: 'LastName', width: 130 },
  { field: 'email', headerName: 'Email',width: 200 },
  {
    field: 'role',
    headerName: 'Role',
    width: 200,
    sortable: false,
    valueGetter: (value, row) => `${value===1?"Admin":"Customer"}`,
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
        <UserModelComponent user={row}/>
        <ConfirmDeleteUser row={row}/>
      </div>
    ),
  }
];
const data = [
  {id:'1', firstname:'Admin', lastname:'', email:'admin@gmail.com', role:1},
  {id:'2', firstname:'John', lastname:'remoro', email:'john@gmail.com', role:2},
  {id:'3', firstname:'sandra', lastname:'denero', email:'sandra@gmail.com', role:2},
  {id:'4', firstname:'user122', lastname:'davinchi',email:'user@gmail.com', role:2},
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



function ConfirmDeleteUser({row}) {
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



function UserModelComponent({user}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {!user?
      <Button onClick={handleOpen} variant='contained' color='primary' sx={{borderRadius:'0.375rem'}}>Add Customer</Button>
      :
      <button onClick={handleOpen} className='bg-liliana-background rounded-md border text-black opacity-70 p-2'><FaPen className='text-sm'/></button>
      }
      <Modal 
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container gap={1}>
            <Grid item xs={12} className='flex justify-between'>
              <p className='font-Poppins font-semibold'>Add New Customer</p>
              <IconButton size='small' onClick={handleClose}><FaXmark/></IconButton>
            </Grid>
            <Grid xs={12} md={5.8} item>
                <div>
                    <label className='text-sm font-semibold font-Opensans'>First Name</label>
                </div>
                {!user?
                <input type="text" className='border-2 rounded-md h-8 focus:outline-blue-400 p-1 text-sm xl:w-full' name="" id="" />
                :
                <input value={user.firstname} type="text" className='border-2 rounded-md h-8 focus:outline-blue-400 p-1 text-sm xl:w-full' name="" id="" />
                }
            </Grid>
            <Grid xs={12} md={5.8} item>
                <div>
                    <label className='text-sm font-semibold font-Opensans'>Last Name</label>
                </div>
                {!user?
                <input type="text" className='border-2 rounded-md h-8 focus:outline-blue-400 p-1 text-sm xl:w-full' name="" id="" />
                :
                <input value={user.lastname} type="text" className='border-2 rounded-md h-8 focus:outline-blue-400 p-1 text-sm xl:w-full' name="" id="" />
                }
            </Grid>
            <Grid xs={12} md={5.8} item>
                <div>
                    <label className='text-sm font-semibold font-Opensans'>email</label>
                </div>
                {!user?
                <input type="text" className='border-2 rounded-md h-8 focus:outline-blue-400 p-1 text-sm xl:w-full' name="" id="" />
                :
                <input value={user.email} type="text" className='border-2 rounded-md h-8 focus:outline-blue-400 p-1 text-sm xl:w-full' name="" id="" />
                }
            </Grid>
            <Grid xs={12} md={5.8} item>
                <div>
                    <label className='text-sm font-semibold font-Opensans'>password</label>
                </div>
                <input type="password" className='border-2 rounded-md h-8 focus:outline-blue-400 p-1 text-sm xl:w-full' name="" id="" />
            </Grid>
            <Grid xs={12} md={5.8} item>
                <div>
                    <label className='text-sm font-semibold font-Opensans'>Role</label>
                </div>
                <FormControl fullWidth>
                  <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      className='h-8 text-black'
                      defaultValue={!user?2:user.role}
                  >
                      <MenuItem value={1}>Admin</MenuItem>
                      <MenuItem value={2}>Customer</MenuItem> 
                  </Select>
                </FormControl>
            </Grid>
            <Grid item sx={{display:'flex', justifyContent:'space-between',flexDirection:'row-reverse'}} xs={12} mt={2}>
              {!user?
                <Button onClick={handleClose} variant='contained' size='small' color='success' sx={{borderRadius:'0.375rem'}}>Add</Button>
              :
                <Button onClick={handleClose} variant='contained' size='small' color='primary' sx={{borderRadius:'0.375rem'}}>Update</Button>
              }
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
          <UserModelComponent/>
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