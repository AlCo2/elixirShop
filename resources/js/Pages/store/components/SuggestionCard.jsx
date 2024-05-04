import { Link, router } from '@inertiajs/react';
import { Alert, Box, Button, Card, CardContent, CardMedia, Grid, Snackbar, Typography } from '@mui/material';
import { useState } from 'react';
import { FaShoppingBasket } from 'react-icons/fa';
import { IoIosAdd } from 'react-icons/io';

const SuggestionCard = ({id, title, image, price}) => {
  const [open, setOpen] = useState(false);
  function addToCart(e){
    e.preventDefault();
    const data = {
        product_id:id
    }
    router.post('/api/cart/add', data, {preserveScroll:true});
    setOpen(true);
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <Grid item >
      <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      >
        <Alert onClose={handleClose} severity='success' variant='filled' sx={{width:'100%'}}>
          {title} added to cart
        </Alert>
      </Snackbar>
      <Card sx={{width:220, ":hover":{boxShadow:5}, cursor:'pointer'}}>
        <Link href={'/store/product/'+id}>
          <Box display={'flex'} justifyContent={'center'}>
              <CardMedia component={'img'}
                sx={{height:150, width:'100%'}}
                image={image}
                alt={title}
              />
          </Box>
        </Link>
        <Box display={'flex'} height={70} justifyContent={'center'}>
          <CardContent>
            <Typography sx={{fontFamily:'Roboto', fontWeight:'bold'}} textAlign={'left'} variant="body1">
              {title}
            </Typography>
          </CardContent>
        </Box>
        <Box display={'flex'} margin={2} justifyContent={'space-between'} alignItems={'center'}>
          <Typography fontFamily={'Poppins'} variant="body2">{price}.00DH</Typography>
        </Box>
        <Box display={'flex'} margin={2} justifyContent={'space-between'} alignItems={'center'}>
          <Button onClick={addToCart} sx={{borderRadius:0}} fullWidth variant="contained" color='liliana_third'>ADD TO CART</Button>
        </Box>
      </Card>
    </Grid>
  )
}

export default SuggestionCard;