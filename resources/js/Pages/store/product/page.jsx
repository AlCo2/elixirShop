import { Alert, Box, Button, Chip, Container, Divider, Grid, Paper, Rating, Snackbar, Typography } from '@mui/material';
import SuggestionCard from '../components/SuggestionCard';
import { router } from '@inertiajs/react';
import Layout from '@/Layout';
import { useState } from 'react';

const product = ({product, products}) => {
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
        router.post('/api/cart/add', data, {preserveScroll:true});
        setOpen(true);
    }
  return (
    <>
        <div>
        <Grid container className='min-h-screen'>
            <Grid item xs={12} sm={6} className='bg-liliana-background sm:p-4'>
                <Box sx={{display:"flex", justifyContent:"center"}}>
                    <img src={product.images[selectedImage]?product.images[selectedImage].url:null} className='sm:w-1/2 max-sm:w-full rounded-md' alt={product.title} />
                </Box>
                <Box sx={{display:'flex', gap:1, justifyContent:'center', my:2}}>
                    <img src={product.images[0]?product.images[0].url:null} onClick={()=>setSelectedImage(0)} className={'max-w-20 cursor-pointer hover:scale-105 duration-300 hover:border-liliana-primary hover:rounded-md '+ (selectedImage===0?'border-2 border-liliana-primary rounded-md':'')} alt={product.title}/>
                    <img src={product.images[1]?product.images[1].url:null} onClick={()=>setSelectedImage(1)} className={'max-w-20 cursor-pointer hover:scale-105 duration-300 hover:border-liliana-primary hover:rounded-md '+ (selectedImage===1?'border-2 border-liliana-primary rounded-md':'')} alt={product.title}/>
                    <img src={product.images[2]?product.images[2].url:null} onClick={()=>setSelectedImage(2)} className={'max-w-20 cursor-pointer hover:scale-105 duration-300 hover:border-liliana-primary hover:rounded-md '+ (selectedImage===2?'border-2 border-liliana-primary rounded-md':'')} alt={product.title}/>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} p={4} bgcolor={"white"} >
                <div className='my-5'>
                    <p className='font-Roboto uppercase opacity-40 font-semibold'>{product.category?product.category.name:''}</p>
                </div>
                <div className='flex justify-between'>
                    <div className='w-4/6'>
                        <p className='font-Roboto font-semibold uppercase text-2xl'>{product.title}</p>
                    </div>
                    <p className='font-Poppins text-xl'>{product.price}.00DH</p>
                </div>
                <div className='my-5'>
                    <p className='font-Roboto text-sm'>{product.description}</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-xs'>Make every gift special 10% off <br /> any two products</p>
                    <Button onClick={addToCart} sx={{borderRadius:0}} variant="contained" color='liliana_third'>ADD TO CART +</Button>
                </div>
            </Grid>
        </Grid>
        <Divider/>
        <Container>
            <p className='font-Poppins text-xl my-4'>Produits similaires</p>
            <Grid container gap={1} justifyContent={{xs:'center', sm:'left'}} my={2}>
                {products.map((product)=>(
                    <SuggestionCard key={product.id} id={product.id} title={product.title} image={product.images[0].url} price={product.price}/>
                ))}
            </Grid>
        </Container>
    </div>
    </>
  )
}

product.layout = page => <Layout children={page} title="Product" />
export default product;