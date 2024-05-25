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
        <Alert onClose={handleClose} severity='success' variant='standard' sx={{width:'100%'}}>
          {product.title} added to cart
        </Alert>
      </Snackbar>
      <Box onMouseOver={()=>setHover(true)} onMouseOut={()=>setHover(false)} sx={{width:220, cursor:'pointer', position:'relative'}}>
        {product.promotion && product.promotion.active?
        <Box sx={{position:'absolute', right:0, top:10, zIndex:1}}>
            <p className='text-white text-xs font-Poppins font-bold bg-black text-right p-1 rounded-l-lg'>{'-'+parseInt(((product.price - product.promotion.promotion_price) / (product.price)) * 100)+'%'}</p>
        </Box>
        :
        null
        }
        <Link href={'/store/product/'+product.id}>
          <Box overflow={'hidden'} position={'relative'} display={'flex'} justifyContent={'center'}>
              <CardMedia component={'img'}
                sx={{height:220, width:'100%', zIndex:(hover?1:0), transitionDuration:(hover?'1000ms':'')}}
                image={product.images[1].url}
                className={'absolute ' + (hover?'scale-125 opacity-100':'opacity-0')}
                alt={product.title}
              />
              <CardMedia component={'img'}
                sx={{height:220, width:'100%'}}
                image={product.images[0].url}
                alt={product.title}
              />
              <Box sx={{display:{xs:'none',sm:'none', md:'flex'}, opacity:0.9, position:'absolute', width:'100%',transitionDuration:'600ms',bottom:(hover?-18:-60), zIndex:3}} margin={2} justifyContent={'space-between'} alignItems={'center'}>
                <Button onClick={addToCart} sx={{borderRadius:0}} fullWidth variant="contained" color='success'>ADD TO CART</Button>
              </Box>
              <Box sx={{display:{xs:'flex',sm:'flex', md:'none'}, opacity:0.9, position:'absolute', bottom:-10, right:-10, zIndex:3}} margin={2} justifyContent={'space-between'} alignItems={'center'}>
                <Button onClick={addToCart} sx={{borderRadius:0}} fullWidth variant="contained" color='success'><FaShoppingBasket/></Button>
              </Box>
          </Box>
        </Link>
        <Link href={'/store/product/'+product.id}>
          <Box height={40} sx={{overflow:'hidden'}}>
            <p className='text-sm font-Poppins font-medium text-center px-2 pt-1 duration-300 hover:opacity-70'>{product.title}</p>
          </Box>
        </Link>
        {product.promotion && product.promotion.active?
        <Box height={20} margin={1} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography fontFamily={'Roboto'} variant="body2" sx={{fontWeight:600}}>{product.promotion.promotion_price}.00DH</Typography>
          <p className='text-xs opacity-70 line-through'>{product.price}.00DH</p>
        </Box>
        :
        <Box display={'flex'} margin={2} justifyContent={'space-between'} alignItems={'center'}>
          <Typography fontFamily={'Roboto'} variant="body2" sx={{fontWeight:'bold'}}>{product.price}.00DH</Typography>
        </Box>
        }
      </Box>
    </Grid>
  )
}

export default SuggestionCard;