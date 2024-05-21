import { router } from "@inertiajs/react";
import { Box, Button, Grid, IconButton, Modal, Switch } from "@mui/material";
import { useState } from "react";
import { MdLocalOffer } from "react-icons/md";
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

function PromotionModelComponent({product}) {
    const [open, setOpen] = useState(false);
    const [originalPrice, setOriginalPrice] = useState(product.price);
    const [values, setValues] = useState({
      product_id:product.id,
      price:product.price,
      promotion_price:product.promotion?product.promotion.promotion_price:"",
      active:product.promotion && product.promotion.active?true:false,
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

    function handleSubmit(e) {
      e.preventDefault();
      if (values.promotion_price >= values.price)
        return;
      values.promotion_price = parseInt(values.promotion_price);
      router.post('/api/promotion', values);
      handleClose();
    }
  
    function handleUpdate(e) {
      e.preventDefault();
      if (values.promotion_price >= values.price)
        return;
      router.patch('/api/promotion/'+product.promotion.id, values);
      handleClose();
    }
  
    return (
      <div>
        <button onClick={()=>{handleOpen();}} className='bg-green-500 rounded-md border text-white opacity-70 p-2 text-xs flex justify-center items-center font-semibold font-Poppins gap-1'><MdLocalOffer/> promote</button>
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
              <p>{product.title}</p>
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
                {!product.promotion?
                  <Button onClick={handleSubmit} variant='contained' size='small' color='success' sx={{borderRadius:'0.375rem'}}>Add</Button>
                :
                  <Button onClick={handleUpdate} variant='contained' size='small' color='primary' sx={{borderRadius:'0.375rem'}}>Update</Button>
                }
                <Button onClick={handleClose} variant='contained' size='small' color='error' sx={{borderRadius:'0.375rem'}}>Cancle</Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </div>
    );
  }

const FastPromotion = ({product}) => {
  return (
    <PromotionModelComponent product={product}/>
  )
}

export default FastPromotion;