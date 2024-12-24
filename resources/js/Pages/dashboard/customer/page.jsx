import { useState } from 'react'
import {Container, Grid, Button, Modal, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Select, MenuItem, IconButton} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { FaPen, FaTrash } from 'react-icons/fa';
import { FiAlertTriangle } from 'react-icons/fi';
import { FaXmark } from 'react-icons/fa6';
import DashboardLayout from '../DashboardLayout';
import { router } from '@inertiajs/react';
import ConfirmDeleteUser from './components/ConfirmDeleteUser';
import UserModelComponent from './components/UserModelComponent';


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

const page = ({customers}) => {
  return (
    <Container>
      <div>
        <p className="text-2xl font-Poppins font-semibold">Customers</p>
      </div>
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