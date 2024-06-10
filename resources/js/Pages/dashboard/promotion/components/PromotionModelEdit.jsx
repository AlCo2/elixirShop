import { router } from "@inertiajs/react";
import { Autocomplete, Box, Button, Grid, IconButton, Modal, Switch, TextField } from "@mui/material";
import { useState } from "react";
import { FaPen } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";


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

function PromotionModelEdit({products, product}) {
    const [open, setOpen] = useState(false);
    const [originalPrice, setOriginalPrice] = useState(0);
    const [error, setError] = useState(false);
    const [values, setValues] = useState({
      product_id:"",
      price:"",
      promotion_price:"",
      active:false,
    })
    const handleOpen = () => {
      setError(false);
      setOpen(true)
    };
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
      if (values.promotion_price >= values.price)
      {
        setError(true);
        return;
      }
      values.promotion_price = parseInt(values.promotion_price);
      router.post('/promotion', values);
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
      if (values.promotion_price >= originalPrice)
      {
        console.log(values);
        setError(true)
        return;
      }
      router.patch('/promotion/'+id, values);
      handleClose();
    }
  
    return (
      <div>
        {!product?
        <Button onClick={handleOpen} variant='contained' color='dashboard_primary' sx={{borderRadius:'0.375rem'}}>New Promotion</Button>
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
                  {error &&
                    <p className="text-red-500">Promotion price should be smaller then product price</p>
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

export default PromotionModelEdit;