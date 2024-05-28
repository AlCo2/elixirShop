import { CartContext } from '@/Layout';
import { Link } from '@inertiajs/react';
import { Alert, Box, Button, CardMedia, Grid, IconButton, Snackbar, Typography} from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { FaShoppingBasket } from 'react-icons/fa';

const IntroCard = ({product, favourites}) => {
  const [open, setOpen] = useState(false);
  const { cartTotalProducts, setCartTotalProducts } = useContext(CartContext);
  const [isFavourite, setIsFavourite] = useState(false);
  function addToCart(e){
    e.preventDefault();
    const data = {
        product_id:product.id
    }
    axios.post('/api/cart/add', data);
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
    <Grid item >
      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity='success' variant='filled' sx={{width:'100%'}}>
          {product.title} added to cart
        </Alert>
      </Snackbar>
      <Box sx={{width:290, cursor:'pointer', position:'relative','&:hover':{'& .ProductImage':{scale:'125%', opacity:1, zIndex:1, transitionDuration:'1000ms'}, '& .FavouritIcon':{top:-10}, '& .AddToCart':{bottom:-18}}}}>
        {product.promotion &&
        <Box sx={{position:'absolute', right:0, top:10, zIndex:1}}>
            <p className='text-white text-xs font-Poppins font-bold bg-black text-right p-2 rounded-l-lg'>{'-'+parseInt(((product.price - product.promotion.promotion_price) / (product.price)) * 100)+'%'}</p>
        </Box>
        }
        <Link href={'/store/product/'+product.id}>
          <Box overflow={'hidden'} position={'relative'} display={'flex'} justifyContent={'center'}>
            <Box className='FavouritIcon' sx={{display:{xs:'none',sm:'none', md:'flex'}, opacity:0.9, position:'absolute', width:'100%',transitionDuration:'600ms', top:-60, zIndex:3}} margin={2} justifyContent={'space-between'} alignItems={'center'}>
              <IconButton color='error' onClick={addToFavourit}>
                {isFavourite?
                  <BsHeartFill/>
                :
                  <BsHeart/>
                }
              </IconButton>
            </Box>
            <CardMedia component={'img'}
              sx={{height:300, width:'100%'}}
              image={product.images[1].url}
              className={'ProductImage absolute opacity-0'}
            />
            <CardMedia component={'img'}
              sx={{height:300, width:'100%'}}
              image={product.images[0].url}
            />
            <Box className="AddToCart" sx={{display:{xs:'none',sm:'none', md:'flex'}, opacity:0.9, position:'absolute', width:'100%',transitionDuration:'500ms',bottom:-60, zIndex:3}} margin={2} justifyContent={'space-between'} alignItems={'center'}>
              <Button onClick={addToCart} sx={{borderRadius:0}} fullWidth variant="contained" color='success'>ADD TO CART</Button>
            </Box>
            <Box sx={{display:{xs:'flex',sm:'flex', md:'none'}, opacity:0.9, position:'absolute', bottom:-10, right:-10, zIndex:3}} margin={2} justifyContent={'space-between'} alignItems={'center'}>
              <Button onClick={addToCart} sx={{borderRadius:1}} fullWidth variant="contained" color='success'><FaShoppingBasket/></Button>
            </Box>
          </Box>
        </Link>
        <Box display={'flex'} height={45} overflow={'hidden'} justifyContent={'center'}>
          <p className='text-center font-Poppins font-semibold px-2 pt-1 text-sm'>{product.title}</p>
        </Box>
        {product.promotion?
          <Box display={'flex'} mr={2} justifyContent={'space-between'} alignItems={'center'}>
          <div className='rounded-tr-md'>
              <p className='font-Poppins p-2 font-bold'>{product.promotion.promotion_price}.00DH</p>
          </div>
          <p className='line-through font-Poppins text-sm pl-2'>{product.price}.00DH</p>
        </Box>
        :
        <Box display={'flex'} margin={2} justifyContent={'space-between'} alignItems={'center'}>
          <Typography fontFamily={'Poppins'} variant="body2">{product.price}DH</Typography>
        </Box>
        }
      </Box>
    </Grid>
  )
}

export default IntroCard;