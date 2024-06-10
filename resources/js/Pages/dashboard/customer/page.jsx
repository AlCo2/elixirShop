import { useState } from 'react'
import {Container, Grid, Button, Modal, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Select, MenuItem, IconButton} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { FaPen, FaTrash } from 'react-icons/fa';
import { FiAlertTriangle } from 'react-icons/fi';
import { FaXmark } from 'react-icons/fa6';
import DashboardLayout from '../DashboardLayout';
import { router } from '@inertiajs/react';


const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstname', headerName: 'FirstName', width: 120 },
  { field: 'lastname', headerName: 'LastName', width: 120 },
  { field: 'email', headerName: 'Email',width: 160 },
  { field: 'address', headerName: 'Address', width: 130 },
  { field: 'phone', headerName: 'Phone',width: 120 },
  {
    field: 'role_id',
    headerName: 'Role',
    width: 100,
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



function UserModelComponent({user}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [values, setValues] = useState({
    firstname:"",
    lastname:"",
    email:"",
    address:"",
    phone:"",
    role:2,
    password:"",
  })

  function handleSelectChange(e) {
    const { name, value } = e.target;
    setValues(prevValues => ({
        ...prevValues,
        [name]: value,
    }));
  }

  function handleChange(e) {
    const key = e.target.id;
    const value = e.target.value
    setValues(values => ({
        ...values,
        [key]: value,
    }))
  }

  function handleSubmit(e) {
    e.preventDefault();
    router.post('/user', values);
    values.firstname = ""
    values.lastname = ""
    values.address = ""
    values.phone = ""
    values.password = ""
    values.email = ""
    values.role = 2
    handleClose();
  }

  function prepareUpdate(user)
  {
    values.firstname = user.firstname
    values.lastname = user.lastname
    values.address = user.address
    values.phone = user.phone
    values.password = ""
    values.email = user.email
    values.role = user.role_id
    handleOpen();
  }

  function handleUpdate(e) {
    e.preventDefault();
    router.post('/user/'+user.id, values);
    handleClose();
  }

  return (
    <div>
      {!user?
      <Button onClick={handleOpen} size='small' variant='contained' color='dashboard_primary' sx={{borderRadius:'0.375rem', textTransform:'none'}}>+ New Customer</Button>
      :
      <button onClick={()=>prepareUpdate(user)} className='bg-liliana-background rounded-md border text-black opacity-70 p-2'><FaPen className='text-sm'/></button>
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
                <input onChange={handleChange} value={values.firstname} type="text" className='border-2 rounded-md h-8 p-1 text-sm xl:w-full' name="firstname" id="firstname" />
            </Grid>
            <Grid xs={12} md={5.8} item>
                <div>
                    <label className='text-sm font-semibold font-Opensans'>Last Name</label>
                </div>
                <input onChange={handleChange} value={values.lastname} type="text" className='border-2 rounded-md h-8 p-1 text-sm xl:w-full' name="lastname" id="lastname" />
            </Grid>
            <Grid xs={12} md={5.8} item>
                <div>
                    <label className='text-sm font-semibold font-Opensans'>email</label>
                </div>
                <input onChange={handleChange} value={values.email} type="text" className='border-2 rounded-md h-8 p-1 text-sm xl:w-full' name="email" id="email" />
            </Grid>
            <Grid xs={12} md={5.8} item>
                <div>
                    <label className='text-sm font-semibold font-Opensans'>password</label>
                </div>
                <input onChange={handleChange} value={values.password} type="password" className='border-2 rounded-md h-8 p-1 text-sm xl:w-full' name="password" id="password" />
            </Grid>
            <Grid xs={12} md={5.8} item>
                <div>
                    <label className='text-sm font-semibold font-Opensans'>Address</label>
                </div>
                <input onChange={handleChange} value={values.address} type="text" className='border-2 rounded-md h-8 p-1 text-sm xl:w-full' name="address" id="address" />
            </Grid>
            <Grid xs={12} md={5.8} item>
                <div>
                    <label className='text-sm font-semibold font-Opensans'>Phone</label>
                </div>
                <input onChange={handleChange} value={values.phone} type="text" className='border-2 rounded-md h-8 p-1 text-sm xl:w-full' name="phone" id="phone" />
            </Grid>
            <Grid xs={12} md={5.8} item>
                <div>
                    <label className='text-sm font-semibold font-Opensans'>Role</label>
                </div>
                <FormControl fullWidth>
                  <Select
                      labelId="role"
                      id="role"
                      name='role'
                      className='h-8 text-black'
                      defaultValue={!user?2:user.role}
                      value={values.role}
                      onChange={handleSelectChange}                >
                      <MenuItem value={1}>Admin</MenuItem>
                      <MenuItem value={2}>Customer</MenuItem> 
                  </Select>
                </FormControl>
            </Grid>
            <Grid item sx={{display:'flex', justifyContent:'space-between',flexDirection:'row-reverse'}} xs={12} mt={2}>
              {!user?
                <Button onClick={handleSubmit} variant='contained' size='small' color='success' sx={{borderRadius:'0.375rem'}}>Add</Button>
              :
                <Button onClick={handleUpdate} variant='contained' size='small' color='primary' sx={{borderRadius:'0.375rem'}}>Update</Button>
              }
              <Button onClick={handleClose} variant='contained' size='small' color='error' sx={{borderRadius:'0.375rem'}}>Cancle</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

const page = ({customers}) => {
  return (
    <Container>
      <Grid container mt={4}>
        <Grid item sx={{display:'flex', justifyContent:'right'}} mb={2} xs={12}>
          <UserModelComponent/>
        </Grid>
        <Grid item xs={12}>
          <DataGrid
            sx={{background:'white', minHeight:200}}
            rows={customers}
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
page.layout = page => <DashboardLayout children={page} tite="customer" />
export default page;