import {Container, Grid, Chip} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { FaEye } from 'react-icons/fa';
import DashboardLayout from '../DashboardLayout';
import { Link } from '@inertiajs/react';
import ConfirmDeleteOrder from './components/ConfirmDeleteOrder';
import OrderModelComponent from './components/OrderModelComponent';

const StatusComponent = ({status}) =>{
  switch (status)
  {
    case 1:
      {
        return (
          <Chip sx={{borderRadius:1, background:'#ffc107'}} size='small' color='warning' label='Pending'/>
        )
      }
    case 2:
      {
        return (
          <Chip sx={{borderRadius:1, backgroundColor:'#8bc34a'}} color='success' size='small' label='Completed'/>
        )
      }
      break;
    case 3:
      {
        return (
          <Chip sx={{borderRadius:1, backgroundColor:'#f44336'}} size='small' color='error' label='Declined'/>
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