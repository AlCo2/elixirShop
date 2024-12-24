import { useState } from 'react'
import {Container, Grid, Button, Modal, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { FaPen, FaTrash } from 'react-icons/fa';
import { FiAlertTriangle } from 'react-icons/fi';
import { FaXmark } from 'react-icons/fa6';
import { router } from '@inertiajs/react';
import DashboardLayout from '../DashboardLayout';
import CategoryModelComponent from './components/CategoryModelComponent';
import ConfirmDeleteCategory from './components/ConfirmDeleteCategory';


const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Category', width: 130 },
  {
    field: 'action',
    headerName: '',
    width: 100,
    sortable:false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: ({row}) =>(
      <div className='h-full flex gap-2 items-center justify-center'>
        <CategoryModelComponent category={row}/>
        <ConfirmDeleteCategory row={row}/>
      </div>
    ),
  }
];

const page = ({categories}) => {
  return (
    <Container>
      <div>
        <p className="text-2xl font-Poppins font-semibold">Categories</p>
      </div>
      <Grid container mt={4}>
        <Grid item sx={{display:'flex', justifyContent:'right'}} mb={2} xs={12}>
          <CategoryModelComponent/>
        </Grid>
        <Grid item xs={12}>
          <DataGrid
            sx={{background:'white', minHeight:200}}
            rows={categories}
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
page.layout = page => <DashboardLayout children={page} tite="category" />
export default page;