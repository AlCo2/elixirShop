import React, { useState } from 'react'
import {Container, Grid, Button, Modal, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { FaPen, FaTrash } from 'react-icons/fa';
import { FiAlertTriangle } from 'react-icons/fi';
import { FaXmark } from 'react-icons/fa6';


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
const data = [
  {id:'1', name:'Maquilage'},
  {id:'2', name:'lips'},
  {id:'3', name:'hands'},
  {id:'4', name:'eyes'},
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



function ConfirmDeleteCategory({row}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (choice) => {
    // if(choice){
    //   router.post('/api/deleteproduct/'+row.id);
    // }
    setOpen(false);
  };
  return (
    <div>
      <button onClick={handleClickOpen} className='bg-red-600 rounded-md border text-white opacity-70 p-2'><FaTrash className='text-sm'/></button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <FiAlertTriangle/>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You sure You want to delete {row.name}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleClose(false)}>cancle</Button>
          <Button onClick={()=>handleClose(true)} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}



function CategoryModelComponent({category}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {!category?
      <Button onClick={handleOpen} variant='contained' color='primary' sx={{borderRadius:'0.375rem'}}>Add Category</Button>
      :
      <button onClick={handleOpen} className='bg-liliana-background rounded-md border text-black opacity-70 p-2'><FaPen className='text-sm'/></button>
      }
      <Modal 
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container gap={1}>
            <Grid item xs={12} className='flex justify-between'>
              <p className='font-Poppins font-semibold'>Add Category</p>
              <IconButton size='small' onClick={handleClose}><FaXmark/></IconButton>
            </Grid>
            <Grid xs={12} item>
                <div>
                    <label className='text-sm font-semibold font-Opensans'>category</label>
                </div>
                {!category?
                <input type="text" className='border-2 rounded-md h-8 focus:outline-blue-400 p-1 text-sm xl:w-full' name="" id="" />
                :
                <input value={category.name} type="text" className='border-2 rounded-md h-8 focus:outline-blue-400 p-1 text-sm xl:w-full' name="" id="" />
                }
            </Grid>
            <Grid item sx={{display:'flex', justifyContent:'space-between',flexDirection:'row-reverse'}} xs={12} mt={2}>
              {!category?
                <Button size='small' onClick={handleClose} variant='contained' color='success' sx={{borderRadius:'0.375rem'}}>Add</Button>
              :
                <Button size='small' onClick={handleClose} variant='contained' color='primary' sx={{borderRadius:'0.375rem'}}>Update</Button>
              }
              <Button size='small' onClick={handleClose} variant='contained' color='error' sx={{borderRadius:'0.375rem'}}>Cancle</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

const page = () => {
  return (
    <Container>
      <Grid container mt={4}>
        <Grid item sx={{display:'flex', justifyContent:'right'}} mb={2} xs={12}>
          <CategoryModelComponent/>
        </Grid>
        <Grid item xs={12}>
          <DataGrid
            sx={{background:'white'}}
            rows={data}
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

export default page;