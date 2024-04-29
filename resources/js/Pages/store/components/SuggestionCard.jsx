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
      <Card sx={{width:{xs:230,sm:200}, ":hover":{boxShadow:5}, cursor:'pointer'}}>
        <Box mt={1} display={'flex'} justifyContent={'center'}>
          <Link href={'/store/product/'+id}>
            <CardMedia component={'img'}
              sx={{height:150, width:150, borderRadius:5}}
              image={image}
              alt={title}
            />
          </Link>
        </Box>
        <Box display={'flex'} height={70} justifyContent={'center'}>
          <CardContent>
            <Typography textAlign={'center'} variant="body1">
              {title}
            </Typography>
          </CardContent>
        </Box>
        <Box display={'flex'} margin={2} mt={0} justifyContent={'space-between'} alignItems={'center'}>
          <Typography fontFamily={'Poppins'} variant="body2">{price}DH</Typography>
          <Box sx={{display:'flex', flexDirection:'column', gap:1}}>
            <Button onClick={addToCart} variant="contained" color='liliana_primary'><IoIosAdd/></Button>
            <Button href={'/store/product/'+id} variant="contained" color='liliana_secondary'><FaShoppingBasket/></Button>
          </Box>
        </Box>
      </Card>
    </Grid>
  )
}

export default SuggestionCard;