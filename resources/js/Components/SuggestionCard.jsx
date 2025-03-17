import { CartContext } from '@/Layout';
import { Link } from '@inertiajs/react';
import { Alert, Box, Button, CardMedia, Grid, IconButton, Snackbar, Typography } from '@mui/material';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { FaShoppingBasket } from 'react-icons/fa';

const SuggestionCard = ({product, favourites}) => {
  const [open, setOpen] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const { cartTotalProducts, setCartTotalProducts } = useContext(CartContext);
  function addToCart(e){
    e.preventDefault();
    const data = {
        product_id:product.id
    }
    axios.post('/cart/add', data);
    setCartTotalProducts(cartTotalProducts + 1);
    setOpen(true);
  }
  function addToFavourit(e)
  {
    e.preventDefault();
    const data = {
      product_id:product.id
    }
    axios.post('/favourite', data).catch(error=>{
      if (error.response.status===401)
        window.location = '/login';
    });
    setIsFavourite(!isFavourite);
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  useEffect(()=>{
    setIsFavourite(favourites.some(p => p.id === product.id))
  }, [])
  return (
    <Grid item>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' variant='standard' sx={{width:'100%'}}>
          {product.title} added to cart
        </Alert>
      </Snackbar>
      <Box sx={{width:220, cursor:'pointer', position:'relative', '&:hover':{'& .ProductImage':{scale:'125%', opacity:1, zIndex:1, transitionDuration:'1000ms'}, '& .FavouritIcon':{top:-10}, '& .AddToCart':{bottom:-18}}}}>
        {product.active?
        <Box sx={{position:'absolute', right:0, top:10, zIndex:1}}>
            <p className='text-white text-xs font-Poppins font-bold bg-black text-right p-1 rounded-l-lg'>{'-'+parseInt(((product.price - product.promotion_price) / (product.price)) * 100)+'%'}</p>
        </Box>
        :
        null
        }
        <Link href={'/store/product/' + product.id} >
          <Box overflow={'hidden'} position={'relative'} display={'flex'} justifyContent={'center'}>
            <Box className='FavouritIcon' sx={{display:{xs:'none',sm:'none', md:'flex'}, opacity:0.9, position:'absolute', width:'100%',transitionDuration:'600ms', top:(isFavourite?-10:-60), zIndex:3}} margin={2} justifyContent={'space-between'} alignItems={'center'}>
              <IconButton color='error' onClick={addToFavourit}>
                {isFavourite?
                  <BsHeartFill/>
                :
                  <BsHeart/>
                }
              </IconButton>
            </Box>
            <CardMedia component={'img'}
              sx={{height:220, width:'100%'}}
              image={product.images[1]?product.images[1].url:null}
              className={'ProductImage absolute opacity-0'}
            />
            <CardMedia component={'img'}
              sx={{height:220, width:'100%'}}
              image={product.images[0]?product.images[0].url:null}
            />
            <Box className="AddToCart" sx={{display:{xs:'none',sm:'none', md:'flex'}, opacity:0.9, position:'absolute', width:'100%',transitionDuration:'600ms',bottom:-60, zIndex:3}} margin={2} justifyContent={'space-between'} alignItems={'center'}>
              <Button onClick={addToCart} sx={{borderRadius:0}} fullWidth variant="contained" color='success'>ADD TO CART</Button>
            </Box>
            <Box sx={{display:{xs:'flex',sm:'flex', md:'none'}, opacity:0.9, position:'absolute', bottom:-10, right:-10, zIndex:3}} margin={2} justifyContent={'space-between'} alignItems={'center'}>
              <IconButton color='error' onClick={addToFavourit}>
                {isFavourite?
                  <BsHeartFill/>
                :
                  <BsHeart/>
                }
              </IconButton>
              <Button onClick={addToCart} sx={{borderRadius:0}} fullWidth variant="contained" color='success'><FaShoppingBasket/></Button>
            </Box>
          </Box>
        </Link>
        <Link href={'/store/product/'+product.id}>
          <Box height={40} sx={{overflow:'hidden'}}>
            <p className='text-sm font-Poppins font-medium text-center px-2 pt-1 duration-300 hover:opacity-70'>{product.title}</p>
          </Box>
        </Link>
        {product.active?
        <Box height={20} margin={1} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography fontFamily={'Roboto'} variant="body2" sx={{fontWeight:600}}>{product.promotion_price}.00DH</Typography>
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