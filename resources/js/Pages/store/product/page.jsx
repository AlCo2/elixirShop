import { Alert, Box, Button, Chip, Container, Divider, Grid, Paper, Rating, Snackbar, Typography } from '@mui/material';
import { BiCartAdd, BiInfoCircle, BiPlusCircle } from 'react-icons/bi';
import SuggestionCard from '../components/SuggestionCard';
import { CiDeliveryTruck } from 'react-icons/ci';
import { FaMoneyBill } from 'react-icons/fa';
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
    <div className='bg-liliana-background'>
        <Container className='min-h-screen py-5'>
        <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        >
            <Alert onClose={handleClose} severity='success' variant='filled' sx={{width:'100%'}}>
            {product.title} added to cart
            </Alert>
        </Snackbar>
            <Grid container className='mb-2'>
                <Grid item sm={12} md={12}>
                    <Paper variant='outlined'>
                        <Grid container columns={16} justifyContent={'center'}>
                            <Grid item display={'flex'} justifyContent={'right'} xs={16}>
                                {product.Q>0?
                                <Chip color='error' label="Out of stock" className='mr-2 mt-2' />
                                :
                                <Box color='error' label="" className='mr-2 mt-2' />
                                }
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{flexDirection:{sm:'row-reverse'}}} display={{sm:'flex'}} gap={2}>
                                <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                    <img src={product.images[selectedImage]?product.images[selectedImage].url:null} className='max-h-80 rounded-md border mb-2' alt="packfakhama" />
                                </Box>
                                <Box sx={{display:'flex', gap:1, justifyContent:'center', flexDirection:{sm:'column'}}}>
                                    <img src={product.images[0]?product.images[0].url:null} onClick={()=>setSelectedImage(0)} className={'max-w-10 cursor-pointer hover:scale-105 duration-300 hover:border-liliana-primary hover:rounded-md '+ (selectedImage===0?'border-2 border-liliana-primary rounded-md':'')} alt={product.title}/>
                                    <img src={product.images[1]?product.images[1].url:null} onClick={()=>setSelectedImage(1)} className={'max-w-10 cursor-pointer hover:scale-105 duration-300 hover:border-liliana-primary hover:rounded-md '+ (selectedImage===1?'border-2 border-liliana-primary rounded-md':'')} alt={product.title} />
                                    <img src={product.images[2]?product.images[2].url:null} onClick={()=>setSelectedImage(2)} className={'max-w-10 cursor-pointer hover:scale-105 duration-300 hover:border-liliana-primary hover:rounded-md '+ (selectedImage===2?'border-2 border-liliana-primary rounded-md':'')} alt={product.title} />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} m={6} sx={{flexDirection:'column'}} display={'flex'} justifyContent={'space-between'}>
                                <Grid item>
                                    <Typography variant='h5'>{product.title}</Typography>
                                    <Divider/>
                                    <p className=''>{product.price}DH</p>
                                </Grid>
                                <Grid item display={'flex'} sx={{flexDirection:'column'}} gap={1} >
                                    <Rating name="size-small" defaultValue={2} size="small" />
                                    <Button onClick={addToCart} variant='contained' color='liliana_primary' className='h-8'><BiPlusCircle/> Add</Button>
                                    <Button variant='contained' color='liliana_secondary' className='h-8'><BiCartAdd/> Buy</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container gap={1}>
                <Grid item xs sm md={7} className='bg-white p-4 border mt-2 max-sm:w-full rounded-md'>
                    <p className='font-bold font-Poppins flex items-center gap-1 text-liliana-third'><BiInfoCircle/>Description</p>
                    <Divider className='my-2'/>
                    <p className='text-sm font-Roboto px-6'>
                        {product.description}
                    </p>
                </Grid>
                <Grid item sm md className='bg-white p-4 border mt-2 max-sm:w-full rounded-md'>
                    <p className='font-bold font-Poppins flex items-center gap-2 text-liliana-third'>Information</p>
                    <Divider className='my-2'/>
                    <Box ml={2}>
                        <p className='text-xs flex items-center gap-1'><span className='text-sm font-bold'>Category:</span>{product.category?product.category.name:''}</p>
                    </Box>
                    <Box ml={2}>
                        <p className='text-xs flex items-center gap-1'><FaMoneyBill/> Paiement à la livraison</p>
                    </Box>
                    <Box ml={2}>
                        <p className='text-xs flex items-center gap-1'><CiDeliveryTruck/> Livraison gratuite</p>
                    </Box>
                    <Box ml={2}>
                        <p className='text-sm flex items-center gap-2 font-bold'>Politique de retour</p>
                        <p className='text-xs'>Retour gratuit dans les 7 jours suivant la date de livraison.</p>
                    </Box>
                </Grid>
            </Grid> 
            <p className='font-Poppins text-xl mt-2'>Latest Product</p>
            <Divider/>
            <Grid container gap={1} justifyContent={{xs:'center', sm:'left'}} mt={2}>
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