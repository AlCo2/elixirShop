import { Chip, Container, Grid } from "@mui/material";
import DashboardLayout from "../DashboardLayout";
import { DataGrid } from "@mui/x-data-grid";
import MessagesModal from "./components/MessagesModal";
import SeenComponent from "./components/SeenComponent";


const StatusComponent = ({status}) =>{
  switch (status)
  {
    case 1:
      {
        return (
          <Chip sx={{borderRadius:1}} size='small' color='warning' label='Pending'/>
        )
        break;
      }
    case 2:
      {
        return (
          <Chip sx={{borderRadius:1}} size='small' color='info' label='Seen'/>
        )
        break;
      }
    case 3:
      {
      return (
        <Chip sx={{borderRadius:1}} size='small' color='success' label='Replied'/>
      )
      break;
    }
  }
}

function formatDate(date)
{
  const formated_date = new Date(date);
  return formated_date.getFullYear()+'/'+(formated_date.getMonth()+1)+'/'+formated_date.getDate();
}

const columns = [
  { field: 'id', headerName: 'ID', width: 80 },
  { 
    field: 'email',
    headerName: 'Email',
    width: 150,
  },
  { 
    field: 'message',
    headerName: 'Message',
    width: 150,
  },
  { 
    field: 'created_at',
    headerName: 'Date',
    width: 110,
    headerAlign:'center',
    align:'center',
    valueGetter: (value, row) => formatDate(value),
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
    field: 'action',
    headerName: '',
    width: 140,
    sortable:false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: ({row}) =>(
      <div className='h-full flex gap-2 items-center justify-center'>
        <MessagesModal message={row}/>
        <SeenComponent row={row}/>
      </div>      
    ),
  }
];



const page = ({messages}) => {
  return (
    <Container>
      <div>
        <p className="text-2xl font-Poppins font-semibold">Messages</p>
      </div>
      <Grid container mt={4}>
        <Grid item xs={12}>
          <DataGrid
            sx={{background:'white', minHeight:200}}
            rows={messages}
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
page.layout = page => <DashboardLayout children={page} tite="message" />
export default page;