import React, { useEffect, useState } from 'react'
import {Container, Grid, Button, Modal, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, FormControl, Select, MenuItem} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { FaPen, FaTrash } from 'react-icons/fa';
import { FiAlertTriangle } from 'react-icons/fi';
import { FaXmark } from 'react-icons/fa6';
import { router } from '@inertiajs/react';



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



function ConfirmDeleteProduct({row}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (choice) => {
    if(choice){
      router.delete('/api/product/' + row.id);
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

function ProductModelComponent({product, categories}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [values, setValues] = useState({
    title:"",
    description:"",
    Q: "",
    category:"",
    price: "",
    image: null,
  })

  function handleSelectChange(e) {
    const { name, value } = e.target;
    setValues(prevValues => ({
        ...prevValues,
        [name]: value,
    }));
  }
  function handleChange(e) {
    const { id, value, type } = e.target;
    setValues(prevValues => ({
      ...prevValues,
      [id]: type === 'file' ? e.target.files[0] : value, // If it's a file input, get the file, otherwise get the value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    values.Q = parseInt(values.Q);
    values.price = parseInt(values.price);
    if(Number.isNaN(values.Q) || Number.isNaN(values.price))
      return;
    if(values.Q<=0 || values.price<=0)
      return;
    router.post('/api/product', values);
    values.title = "";
    values.description = "";
    values.Q = "";
    values.category = "";
    values.price = "";
    values.image = null; 
    handleClose();
  }
  const prepereUpdate = (product) =>{
    values.title = product.title;
    values.description = product.description;
    values.category = product.category_id;
    values.Q = product.Qty;
    values.price = product.price;
    values.image = null;
  }

  function handleUpdate(e) {
    e.preventDefault();
    router.post('/api/product/' + product.id, values); 
    handleClose();
  }
  return (
    <div>
      {!product?
      <Button onClick={handleOpen} variant='contained' color='primary' sx={{borderRadius:'0.375rem'}}>Add Product</Button>
      :
      <button onClick={()=>{prepereUpdate(product);handleOpen();}} className='bg-liliana-background rounded-md border text-black opacity-70 p-2'><FaPen className='text-sm'/></button>
      }
      <Modal 
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container gap={1}>
            <Grid item xs={12} className='flex justify-between'>
              <p className='font-Poppins font-semibold'>Add New Product</p>
              <IconButton size='small' onClick={handleClose}><FaXmark/></IconButton>
            </Grid>
            <Grid xs={12} md={5.8} item>
                <div>
                    <label className='text-sm font-semibold font-Opensans'>Title</label>
                </div>
                {!product?
                <input type="text" onChange={handleChange} value={values.title} className='border-2 rounded-md h-8 p-1 text-sm xl:w-full' name="title" id="title" />
                :
                <input value={values.title} onChange={handleChange} type="text" className='border-2 rounded-md h-8 p-1 text-sm xl:w-full' name="title" id="title" />
                }
            </Grid>
            <Grid xs={12} md={5.8} item>
                <div>
                    <label className='text-sm font-semibold font-Opensans'>Category</label>
                </div>
                <FormControl fullWidth>
                  <Select
                      labelId="category"
                      id="category"
                      name='category'
                      className='h-8 text-black'
                      defaultValue={product?values.category:""}
                      onChange={handleSelectChange}
                      value={values.category}    
                  >
                    {categories.map((category)=>(
                      <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
            </Grid>
            <Grid xs={12} item>
                <div>
                    <label className='text-sm font-semibold font-Opensans'>Description</label>
                </div>
                {!product?
                <>
                <input type="text" value={values.description}  onChange={handleChange} className='border-2 rounded-md h-8 p-1 text-sm xl:w-full' name="description" id="description" />
                </>
                :
                <input value={values.description} onChange={handleChange} type="text" className='border-2 rounded-md h-8 p-1 text-sm xl:w-full' name="description" id="description" />
                }
            </Grid>
            <Grid xs={12} md={5.8} item>
                <div>
                    <label className='text-sm font-semibold font-Opensans'>Q</label>
                </div>
                {!product?
                <input type="number" value={values.Q}  onChange={handleChange} className='border-2 rounded-md h-8 p-1 text-sm xl:w-full' name="Q" id="Q" />
                :
                <input value={values.Q} onChange={handleChange} type="number" className='border-2 rounded-md h-8 p-1 text-sm xl:w-full' name="Q" id="Q" />
                }
            </Grid>
            <Grid xs={12} md={5.8} item>
                <div>
                    <label className='text-sm font-semibold font-Opensans'>price</label>
                </div>
                {!product?
                <input type="number" value={values.price} onChange={handleChange} className='border-2 rounded-md h-8 p-1 text-sm xl:w-full' name="price" id="price" />
                :
                <input value={values.price} onChange={handleChange} type="number" className='border-2 rounded-md h-8 p-1 text-sm xl:w-full' name="price" id="price" />
                }
            </Grid>
            <Grid xs={12} item>
                <div>
                    <label className='text-sm font-semibold font-Opensans'>image</label>
                </div>
                <input type="file" onChange={handleChange} name="image" id="image" />
            </Grid>
            <Grid item sx={{display:'flex', justifyContent:'space-between',flexDirection:'row-reverse'}} xs={12} mt={2}>
              {!product?
                <Button size='small' onClick={handleSubmit} variant='contained' color='success' sx={{borderRadius:'0.375rem'}}>Add</Button>
              :
                <Button size='small' onClick={handleUpdate} variant='contained' color='primary' sx={{borderRadius:'0.375rem'}}>Update</Button>
              }
              <Button size='small' onClick={handleClose} variant='contained' color='error' sx={{borderRadius:'0.375rem'}}>Cancle</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

const page = ({products, categories}) => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 130 },
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
      width: 100,
      sortable:false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: ({row}) =>(
        <div className='h-full flex gap-2 items-center justify-center'>
          <ProductModelComponent product={row} categories={categories}/>
          <ConfirmDeleteProduct row={row}/>
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
            sx={{background:'white', minHeight:200}}
            rows={products}
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

export default page;