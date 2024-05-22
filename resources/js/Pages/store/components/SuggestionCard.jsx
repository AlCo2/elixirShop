import { CartContext } from '@/Layout';
import { Link } from '@inertiajs/react';
import { Alert, Box, Button, Card, CardMedia, Grid, Snackbar, Typography } from '@mui/material';
import axios from 'axios';
import { useContext, useState } from 'react';
import { FaShoppingBasket } from 'react-icons/fa';

const SuggestionCard = ({product}) => {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const { cartTotalProducts, setCartTotalProducts } = useContext(CartContext);
  
  function addToCart(e){
    e.preventDefault();
    const data = {
        product_id:product.id
    }
    axios.post('/api/cart/add', data);
    setCartTotalProducts(cartTotalProducts + 1);
    setOpen(true);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <Grid item>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity='success' variant='filled' sx={{width:'100%'}}>
          {product.title} added to cart
        </Alert>
      </Snackbar>
      <Card variant='outlined' onMouseOver={()=>setHover(true)} onMouseOut={()=>setHover(false)} sx={{width:220, ":hover":{boxShadow:2,}, cursor:'pointer'}}>
        <Link href={'/store/product/'+product.id}>
          <Box overflow={'hidden'} position={'relative'} display={'flex'} justifyContent={'center'}>
              <CardMedia component={'img'}
                sx={{height:220, width:'100%'}}
                image={hover?product.images[1].url:product.images[0].url}
                className={'duration-700 ' + (hover?'scale-125':'')}
                alt={product.title}
              />
              <Box sx={{display:{xs:'none',sm:'none', md:'flex'}, opacity:0.9, position:'absolute', width:'100%',transitionDuration:'300ms',bottom:(hover?-18:-60)}} margin={2} justifyContent={'space-between'} alignItems={'center'}>
                <Button onClick={addToCart} sx={{borderRadius:0}} fullWidth variant="contained" color='liliana_third'>ADD TO CART</Button>
              </Box>
              <Box sx={{display:{xs:'flex',sm:'flex', md:'none'}, opacity:0.9, position:'absolute', bottom:-10, right:-10}} margin={2} justifyContent={'space-between'} alignItems={'center'}>
                <Button onClick={addToCart} sx={{borderRadius:0}} fullWidth variant="contained" color='liliana_third'><FaShoppingBasket/></Button>
              </Box>
          </Box>
        </Link>
        <Box height={40} sx={{overflow:'hidden'}}>
          <p className='text-sm font-Poppins font-semibold text-left px-2 pt-1'>{product.title}</p>
        </Box>
        {product.promotion && product.promotion.active?
        <Box height={20} margin={1} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography fontFamily={'Poppins'} variant="body2" sx={{fontWeight:500}}>{product.promotion.promotion_price}.00DH</Typography>
          <p className='text-xs opacity-70 line-through'>{product.price}.00DH</p>
        </Box>
        :
        <Box display={'flex'} margin={2} justifyContent={'space-between'} alignItems={'center'}>
          <Typography fontFamily={'Poppins'} variant="body2" sx={{fontWeight:'bold'}}>{product.price}.00DH</Typography>
        </Box>
        }
      </Card>
    </Grid>
  )
}

export default SuggestionCard;