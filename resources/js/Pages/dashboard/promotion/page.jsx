import { useState } from 'react'
import {Container, Grid, Button, Modal, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Select, MenuItem, IconButton, Autocomplete, TextField, Chip, Switch} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { FaPen, FaTrash } from 'react-icons/fa';
import { FiAlertTriangle } from 'react-icons/fi';
import { FaXmark } from 'react-icons/fa6';
import DashboardLayout from '../DashboardLayout';
import { router } from '@inertiajs/react';

const ActiveStatus = ({active}) =>{
  if (active)
    return <Chip size='small' label="Active" color="success" /> 
  else
    return <Chip size='small' label="Inactive" color="error" /> 
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
    width: 120,
    valueGetter: (value, row) =>(
      row.product.price
    ),
  },
  { field: 'promotion_price', headerName: 'Promotion Price',width: 160 },
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
        <PromotionModelComponent product={row}/>
        <ConfirmDeleteUser row={row}/>
      </div>
    ),
  }
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

function ConfirmDeleteUser({row}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (choice) => {
    if(choice){
      router.delete('/api/promotion/'+row.id);
    }
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



function PromotionModelComponent({products, product}) {
  const [open, setOpen] = useState(false);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [values, setValues] = useState({
    product_id:"",
    price:"",
    promotion_price:"",
    active:false,
  })
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handleChange(e) {
    const { id, value, type } = e.target;
    setValues(prevValues => ({
      ...prevValues,
      [id]: value, // If it's a file input, get the file, otherwise get the value
    }));
  }

  const handleSwitchClick = () => {
    setValues(prevValues => ({
        ...prevValues,
        active: !prevValues.active
    }));
  };

  function handleSelectChange(e, value){
    values.product_id = value.id;
    values.price = value.price;
    setOriginalPrice(values.price)
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (values.promotion_price > values.price)
      return;
    values.promotion_price = parseInt(values.promotion_price);
    router.post('/api/promotion', values);
    values.promotion_price = "";
    values.active = false;
    handleClose();
  }

  function prepareUpdate()
  {
    values.promotion_price=product.promotion_price;
    values.active=product.active?true:false;
    setOriginalPrice(product.product.price);
  }

  function handleUpdate(e, id) {
    e.preventDefault();
    router.patch('/api/promotion/'+id, values);
    handleClose();
  }

  return (
    <div>
      {!product?
      <Button onClick={handleOpen} variant='contained' color='primary' sx={{borderRadius:'0.375rem'}}>New Promotion</Button>
      :
      <button onClick={()=>{prepareUpdate();handleOpen();}} className='bg-liliana-background rounded-md border text-black opacity-70 p-2'><FaPen className='text-sm'/></button>
      }
      <Modal 
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container gap={1}>
            <Grid item xs={12} className='flex justify-between'>
              <p className='font-Poppins font-semibold'>Add New Offer</p>
              <IconButton size='small' onClick={handleClose}><FaXmark/></IconButton>
            </Grid>
            <Grid xs={12} item>
                {!product &&
                <Autocomplete
                  disablePortal
                  id="product_id"
                  options={products}
                  renderInput={(params) => <TextField {...params} label="product" />}
                  getOptionKey={(option)=>option.id ?? option}
                  getOptionLabel={(option)=>option.title ?? option}
                  onChange={handleSelectChange}
                />
                }
            </Grid>
            <Grid xs={12} item>
                <div>
                    <label className='text-sm font-semibold font-Opensans'>Original Price</label>
                </div>
                <p>{originalPrice}</p>
            </Grid>
            <Grid xs={12} md={5.8} item>
                <div>
                    <label className='text-sm font-semibold font-Opensans'>promotion price</label>
                </div>
                {!product?
                <input type="number" value={values.promotion_price} onChange={handleChange} className='border-2 rounded-md h-8 p-1 text-sm xl:w-full' name="promotion_price" id="promotion_price" />
                :
                <input value={values.promotion_price} onChange={handleChange} type="number" className='border-2 rounded-md h-8 p-1 text-sm xl:w-full' name="promotion_price" id="promotion_price" />
                }
            </Grid>
            <Grid xs={12} md={5.8} item>
                <div>
                    <label className='text-sm font-semibold font-Opensans'>Active</label>
                </div>
                {!product?
                <Switch onClick={handleSwitchClick} checked={values.active}/>
                :
                <Switch onClick={handleSwitchClick} checked={values.active}/>
                }
            </Grid>
            <Grid item sx={{display:'flex', justifyContent:'space-between',flexDirection:'row-reverse'}} xs={12} mt={2}>
              {!product?
                <Button onClick={handleSubmit} variant='contained' size='small' color='success' sx={{borderRadius:'0.375rem'}}>Add</Button>
              :
                <Button onClick={(e)=>handleUpdate(e, product.id)} variant='contained' size='small' color='primary' sx={{borderRadius:'0.375rem'}}>Update</Button>
              }
              <Button onClick={handleClose} variant='contained' size='small' color='error' sx={{borderRadius:'0.375rem'}}>Cancle</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

const page = ({products, promotions}) => {
  return (
    <Container>
      <Grid container mt={4}>
        <Grid item sx={{display:'flex', justifyContent:'right'}} mb={2} xs={12}>
          <PromotionModelComponent products={products}/>
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
            // slots={{toolbar:GridToolbar}}
          />
        </Grid>
      </Grid>
    </Container>
  )
}
page.layout = page => <DashboardLayout children={page} tite="customer" />
export default page;