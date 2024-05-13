import { Link, router, usePage } from '@inertiajs/react';
import { Alert, Box, Button, Card, CardContent, CardMedia, Grid, Snackbar, Typography} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { FaShoppingBasket } from 'react-icons/fa';
const IntroCard = ({id, title, image, price}) => {
  const { cart } = usePage().props;
  const [open, setOpen] = useState(false);
  function addToCart(e){
    e.preventDefault();
    const data = {
        product_id:id
    }
    axios.post('/api/cart/add', data, {preserveScroll:true});
    router.reload({only:['cart']});
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
      <Card sx={{width:240, ":hover":{boxShadow:5}, cursor:'pointer'}}>
        <Link href={'/store/product/'+id}>
          <Box display={'flex'} justifyContent={'center'}>
              <CardMedia component={'img'}
                sx={{height:180, width:'100%'}}
                image={image}
                alt={title}
              />
          </Box>
        </Link>
        <Box display={'flex'} height={70} justifyContent={'center'}>
          <CardContent>
            <p className='text-center font-bold'>{title}</p>
          </CardContent>
        </Box>
        <Box display={'flex'} margin={2} justifyContent={'space-between'} alignItems={'center'}>
          <Typography fontFamily={'Poppins'} variant="body2">{price}DH</Typography>
          <Button onClick={addToCart} variant="contained" color='liliana_third'><FaShoppingBasket/></Button>
        </Box>
      </Card>
    </Grid>
  )
}

export default IntroCard;