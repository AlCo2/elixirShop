import {Container, Grid, Chip} from '@mui/material'
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarQuickFilter } from '@mui/x-data-grid';
import DashboardLayout from '../DashboardLayout';
import PromotionModelEdit from './components/PromotionModelEdit';
import ConfirmDeletePromotion from './components/ConfirmDeletePromotion';
import ActivateAllPromotion from './components/ActivateAllPromotion';
import DesactivateAllPromotion from './components/DesactivateAllPromotion';

const ActiveStatus = ({active}) =>{
  if (active)
    return <Chip sx={{borderRadius:1, backgroundColor:'#8bc34a'}} size='small' label="Active" color="success" /> 
  else
    return <Chip sx={{borderRadius:1, backgroundColor:'#f44336'}} size='small' label="Inactive" color="error" />
}

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { 
    field: 'title',
    headerName: 'Product',
    width: 200,
    valueGetter: (value, row) =>(
      row.product.title 
    ),
  },
  { 
    field: 'price',
    headerName: 'Price',
    headerAlign: 'center',
    align:'center',
    width: 120,
    valueGetter: (value, row) =>(
      row.product.price
    ),
  },
  { field: 'promotion_price',
    headerName: 'Promotion Price',
    headerAlign: 'center',
    align:'center',
    width: 160,
  },
  { 
    field: 'active',
    headerName: 'Status',
    width: 110,
    headerAlign: 'center',
    align:'center',
    renderCell: ({row, value}) =>(
      <ActiveStatus active={value} />
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
        <PromotionModelEdit product={row}/>
        <ConfirmDeletePromotion row={row}/>
      </div>
    ),
  }
];

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

const page = ({products, promotions}) => {
  return (
    <Container>
      <Grid container mt={4}>
        <Grid item sx={{display:'flex', justifyContent:'right', gap:1}} mb={2} xs={12}>
          <ActivateAllPromotion />
          <DesactivateAllPromotion />
          <PromotionModelEdit products={products}/>
        </Grid>
        <Grid item xs={12}>
          <DataGrid
            sx={{background:'white', minHeight:200}}
            rows={promotions}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5]}
            slots={{toolbar:CustomToolbar}}
          />
        </Grid>
      </Grid>
    </Container>
  )
}
page.layout = page => <DashboardLayout children={page} tite="customer" />
export default page;