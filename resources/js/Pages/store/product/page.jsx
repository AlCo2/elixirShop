import { Alert, Box, Button, Chip, Container, Divider, Grid, Paper, Rating, Snackbar, Typography } from '@mui/material';
import SuggestionCard from '../components/SuggestionCard';
import Layout, { CartContext } from '@/Layout';
import { useContext, useState } from 'react';
import axios from 'axios';
import { usePage } from '@inertiajs/react';
import EditProduct from '../components/EditProduct';
import FastPromotion from '../components/FastPromotion';

const product = ({product, products, categories}) => {
    const { auth } = usePage().props;
    const { cartTotalProducts, setCartTotalProducts } = useContext(CartContext);
    const [selectedImage, setSelectedImage] = useState(0)
    const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };
    function addToCart(e){
        e.preventDefault();
        const data = {
            product_id:product.id
        }
        axios.post('/api/cart/add', data);
        setCartTotalProducts(cartTotalProducts + 1);
        setOpen(true);
    }
  return (
    <>
        <div>
        <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
            >
                <Alert onClose={handleClose} severity='success' variant='filled' sx={{width:'100%'}}>
                {product.title} added to cart
                </Alert>
        </Snackbar>
        <Grid container className='min-h-screen'>
            <Grid item xs={12} sm={6} className='bg-liliana-background sm:p-4'>
                <Box sx={{display:"flex", justifyContent:"center"}}>
                    <img src={product.images[selectedImage]?product.images[selectedImage].url:null} className='sm:w-1/2 max-sm:w-full rounded-md' alt={product.title} />
                </Box>
                <Box sx={{display:'flex', gap:1, justifyContent:'center', my:2}}>
                    {product.images.length>0?
                        product.images.map((image, index)=>(
                            <img src={image.url} onClick={()=>setSelectedImage(index)} className={'max-w-20 cursor-pointer hover:scale-105 duration-300 hover:border-liliana-primary hover:rounded-md '+ (selectedImage===index?'border-2 border-liliana-primary rounded-md':'')} alt={product.title}/>
                    ))
                    :
                    null
                    }
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} p={4} bgcolor={"white"} >
                {auth.user && auth.user.role_id==1?
                    <div className='flex justify-end gap-2'>
                        <FastPromotion product={product}/>
                        <EditProduct product={product} categories={categories}/>
                    </div>
                    :
                    null
                }
                <div className='my-5 flex justify-between'>
                    <p className='font-Roboto uppercase opacity-40 font-semibold'>{product.category?product.category.name:''}</p>
                    {product.promotion && product.promotion.active?
                        <Chip sx={{borderRadius:1}} size='small' label="PROMO" variant='outlined' color="error"/>
                        :
                        null
                    }
                </div>
                <div className='flex justify-between flex-wrap'>
                    <div className='w-4/6 max-sm:w-full'>
                        <p className='font-Roboto font-semibold uppercase text-2xl'>{product.title}</p>
                    </div>
                    <div>
                    <p className={'font-Poppins '+(product.promotion && product.promotion.active?'line-through text-sm text-right text-liliana-primary':'text-xl')}>{product.price}.00DH</p>
                    {product.promotion && product.promotion.active?
                        <p className='font-Poppins text-xl'>{product.promotion.promotion_price}.00DH</p>
                        :
                        null
                    }
                    </div>
                </div>
                <div className='my-5'>
                    <p className='font-Roboto text-sm'>{product.description}</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-xs'>Make every gift special 10% off <br /> any two products</p>
                    <Button onClick={addToCart} sx={{borderRadius:0,minWidth:136, maxHeight:37}} variant="contained" color='liliana_third'>ADD TO CART +</Button>
                </div>
            </Grid>
        </Grid>
        <Divider/>
        <Container>
            <p className='font-Poppins text-xl my-4'>Produits similaires</p>
            <Grid container gap={1} justifyContent={{xs:'center', sm:'left'}} my={2}>
                {products.map((product)=>(
                    <SuggestionCard key={product.id} product={product}/>
                ))}
            </Grid>
        </Container>
    </div>
    </>
  )
}

product.layout = page => <Layout children={page} title="Product" />
export default product;