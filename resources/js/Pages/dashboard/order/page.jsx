import { useState } from 'react'
import {Container, Grid, Button, Modal, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Chip, IconButton, Select, FormControl, MenuItem} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { FaEye, FaPen, FaTrash } from 'react-icons/fa';
import { FiAlertTriangle } from 'react-icons/fi';
import { FaXmark } from 'react-icons/fa6';
import DashboardLayout from '../DashboardLayout';
import { Link, router } from '@inertiajs/react';
import ConfirmDeleteOrder from './components/ConfirmDeleteOrder';

const StatusComponent = ({status}) =>{
  switch (status)
  {
    case 1:
      {
        return (
          <Chip sx={{borderRadius:1}} size='small' color='warning' label='Pending'/>
        )
      }
    case 2:
      {
        return (
          <Chip sx={{borderRadius:1}} size='small' color='success' label='Completed'/>
        )
      }
      break;
    case 3:
      {
        return (
          <Chip sx={{borderRadius:1}} size='small' color='error' label='Declined'/>
        )
      }
      break;
  }
}

const columns = [
  { field: 'id', headerName: 'ID', width: 80 },
  { 
    field: 'customer',
    headerName: 'Customer',
    width: 150,
    valueGetter: (value, row) =>(
      row.order_detail.firstname + ' ' +row.order_detail.lastname
    ),
  },
  { 
    field: 'country',
    headerName: 'Country',
    width: 100,
    valueGetter: (value, row) =>(
      row.order_detail.country 
    ),
  },
  { 
    field: 'city',
    headerName: 'City',
    width: 100,
    valueGetter: (value, row) =>(
      row.order_detail.city 
    ),
  },
  { 
    field: 'address',
    headerName: 'Address',
    width: 130,
    valueGetter: (value, row) =>(
      row.order_detail.address 
    ),
  },
  { 
    field: 'status_id',
    headerName: 'Status',
    width: 110,
    headerAlign: 'center',
    align:'center',
    renderCell: ({row}) =>(
      <StatusComponent status={row.status_id}/>
    ),
  },
  { 
    field: 'total',
    headerName: 'Total',
    width: 100,
    valueGetter: (value, row) =>(
      value + 'DH'
    ),
  },
  {
    field: 'action',
    headerName: '',
    width: 140,
    sortable:false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: ({row}) =>(
      <div className='h-full flex gap-2 items-center justify-center'>
        <OrderModelComponent order={row}/>
        <ConfirmDeleteOrder row={row}/>
        <div>
          <Link href={`/dashboard/order/${row.id}`}><button className='bg-black rounded-md border text-white opacity-70 p-2'><FaEye className='text-sm'/></button></Link>
        </div>
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

function OrderModelComponent({order}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [values, setValues] = useState({
    status:order.status_id,
  })

  function handleSelectChange(e) {
    const { name, value } = e.target;
    setValues(prevValues => ({
        ...prevValues,
        [name]: value,
    }));
  }
  function handleUpdate(e) {
    e.preventDefault();
    router.patch('/order/'+order.id, values);
    handleClose();
  }
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
                <label className='text-sm font-semibold font-Poppins opacity-70'>Customer</label>
                </div>
                <p className='ml-2 font-Opensans'>{order.order_detail.firstname + " " + order.order_detail.lastname}</p>
            </Grid>
            <Grid xs={12} md={5.8} item>
                <div>
                    <label className='text-sm font-semibold font-Poppins opacity-70'>Total</label>
                </div>
                <p className='ml-2 font-Poppins'>{order.total}DH</p>
            </Grid>
            <Grid xs={12} md={5.8} item>
                <div>
                <label className='text-sm font-semibold font-Poppins opacity-70'>Status</label>
                </div>
                <FormControl fullWidth>
                  <Select
                      labelId="status"
                      id="status"
                      name='status'
                      className='ml-2 h-8 text-black'
                      defaultValue={!order?"":order.status_id}
                      onChange={handleSelectChange}
                  >
                      <MenuItem value={1} >Pending</MenuItem>
                      <MenuItem value={2} >Completed</MenuItem> 
                      <MenuItem value={3} >Declined</MenuItem> 
                  </Select>
                </FormControl>
            </Grid>
            <Grid item sx={{display:'flex', justifyContent:'space-between',flexDirection:'row-reverse'}} xs={12} mt={2}>
              <Button onClick={handleUpdate} variant='contained' size='small' color='dashboard_primary' sx={{borderRadius:'0.375rem'}}>Update</Button>
              <Button onClick={handleClose} variant='contained' size='small' color='error' sx={{borderRadius:'0.375rem'}}>Cancle</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

const page = ({order}) => {
  return (
    <Container>
      <Grid container mt={4}>
        <Grid item sx={{display:'flex', justifyContent:'right'}} mb={2} xs={12}>
        </Grid>
        <Grid item xs={12}>
          <DataGrid
            sx={{background:'white', minHeight:200}}
            rows={order}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5]}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

page.layout = page => <DashboardLayout children={page} tite="order" />
export default page;