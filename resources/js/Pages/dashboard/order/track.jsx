import {Container, Grid} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import DashboardLayout from '../DashboardLayout';
import ConfirmDeleteTrack from './components/ConfirmDeleteTrack';
import Track from './components/Track';

const track = ({orders_overview, sales_overview, total_orders}) => {
  const columns = [
    { field: 'date_created', headerName: 'Date', width: 200, align:'center', headerAlign:'center' },
    { field: 'total_orders', headerName: 'Total Orders', width: 130, align:'center' },
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
        <Track total={total_orders}/>
        <Grid item sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}} mb={2} xs={12}>
          <p className='font-Poppins font-semibold'>Track</p>
        </Grid>
        <Grid item xs={12}>
          <DataGrid
            sx={{background:'white'}}
            rows={orders_overview}
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