import { Chip, Container, Grid } from "@mui/material";
import DashboardLayout from "../DashboardLayout";
import { DataGrid } from "@mui/x-data-grid";
import MessagesModal from "./components/MessagesModal";


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
          <Chip sx={{borderRadius:1}} size='small' color='success' label='Replied'/>
        )
      }
      break;
  }
}

const data = [
  {
    id:1,
    email:'test@gmail.com',
    status_id:1,
    message:'I am just A long description, a trial so I can check out if the width is looking good in my app or not, so yeah, this is an easy way to showcase this',
    date: '1/1/2024',
  },
  {
    id:2,
    email:'test@gmail.com',
    status_id:2,
    message:'sadsadsad sad sad sad as d sad sad sa dsa d sad saddsa sd ad as dadakdashda',
    date: '1/1/2024',
  },
  {
    id:3,
    email:'test@gmail.com',
    status_id:1,
    message:'sadsadsad sad sad sad as d sad sad sa dsa d sad saddsa sd ad as dadakdashda',
    date: '1/1/2024',
  },
]

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
    field: 'date',
    headerName: 'date',
    width: 100,
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
      <MessagesModal message={row}/>
    ),
  }
];



const page = () => {
  return (
    <Container>
      <div>
        <p className="text-2xl font-Poppins font-semibold">Messages</p>
      </div>
      <Grid container mt={4}>
        <Grid item sx={{display:'flex', justifyContent:'right'}} mb={2} xs={12}>
        </Grid>
        <Grid item xs={12}>
          <DataGrid
            sx={{background:'white', minHeight:200}}
            rows={data}
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