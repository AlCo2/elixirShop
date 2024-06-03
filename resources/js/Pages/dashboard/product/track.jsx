import {Container, Grid} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import DashboardLayout from '../DashboardLayout';
import TrackProducts from './components/TrackProducts';
import ConfirmDeleteTrack from './components/ConfirmDeleteTrack';

const track = ({products_overview, total_products}) => {
  const columns = [
    { field: 'date_created', headerName: 'Date', width: 200, align:'center', headerAlign:'center' },
    { field: 'total_products', headerName: 'Total Products', width: 130, align:'center' },
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
          <ConfirmDeleteTrack row={row}/>
        </div>
      ),
    }
  ];

  return (
    <Container>
      <Grid container mt={4}>
        <TrackProducts total_products={total_products}/>
        <Grid item sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}} mb={2} xs={12}>
          <p className='font-Poppins font-semibold'>Track</p>
        </Grid>
        <Grid item xs={12}>
          <DataGrid
            sx={{background:'white'}}
            rows={products_overview}
            columns={columns}
            autoHeight={true}
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

track.layout = track => <DashboardLayout children={track} tite="product" />
export default track;