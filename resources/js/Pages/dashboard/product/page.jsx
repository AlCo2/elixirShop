import {Container, Grid} from '@mui/material'
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarExport, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { FaEye } from 'react-icons/fa';
import { Link } from '@inertiajs/react';
import DashboardLayout from '../DashboardLayout';
import ProductModelComponent from './components/ProductModelComponent';
import ConfirmDeleteProduct from './components/ConfirmDeleteProduct';



function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport
      
      csvOptions={{
        utf8WithBom: true,
      }}
  />
      <GridToolbarQuickFilter/>
    </GridToolbarContainer>
  );
}

const page = ({products, categories}) => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'category',
      headerName: 'Category',
      width: 130,
      valueGetter: (value)=>{
        return value?value.name:'';
      }  
    },
    { field: 'Qty', headerName: 'Q', width: 130 },
    { field: 'price', headerName: 'Price', width: 130 },
    {
      field: 'action',
      headerName: '',
      disableExport: true,
      width: 150,
      sortable:false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: ({row}) =>(
        <div className='h-full flex gap-2 items-center justify-center'>
          <ProductModelComponent product={row} categories={categories}/>
          <ConfirmDeleteProduct row={row}/>
          <div>
            <Link href={`/store/product/${row.id}`}><button className='bg-black rounded-md border text-white opacity-70 p-2'><FaEye className='text-sm'/></button></Link>
          </div>
        </div>
      ),
    }
  ];

  return (
    <Container>
      <Grid container mt={4}>
        <Grid item sx={{display:'flex', justifyContent:'right'}} mb={2} xs={12}>
          <ProductModelComponent categories={categories} />
        </Grid>
        <Grid item xs={12}>
          <DataGrid
            sx={{background:'white'}}
            rows={products}
            columns={columns}
            autoHeight={true}
            slots={{
              toolbar:CustomToolbar
            }}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 25, 50, 100]}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

page.layout = page => <DashboardLayout children={page} tite="product" />
export default page;