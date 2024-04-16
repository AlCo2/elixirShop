import { Box, Button, Chip, Container, Divider, Grid, Paper, Rating, Typography } from '@mui/material';
import React from 'react'
import { BiCartAdd, BiInfoCircle, BiPlusCircle } from 'react-icons/bi';
import SuggestionCard from '../components/SuggestionCard';
import { CiDeliveryTruck } from 'react-icons/ci';
import { FaMoneyBill } from 'react-icons/fa';

const product = () => {
  return (
    <>
    <div className='bg-liliana-background'>
        <Container className='min-h-screen py-5'>
            <Grid container>
                <Grid item sm={12} md={12}>
                    <Paper variant='outlined'>
                        <Grid container columns={16} justifyContent={'center'}>
                            <Grid item display={'flex'} justifyContent={'right'} xs={16}>
                                <Chip color='error' label="Out of stock" className='mr-2 mt-2' />
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{flexDirection:{sm:'row-reverse'}}} display={{sm:'flex'}} gap={2}>
                                <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                    <img src="/assets/kiko.jpg" className='max-h-80 border mb-2' alt="packfakhama" />
                                </Box>
                                <Box sx={{display:'flex', gap:1, justifyContent:'center', flexDirection:{sm:'column'}}}>
                                    <img src="/assets/kiko.jpg" className='max-w-10 cursor-pointer hover:scale-105 duration-300 border-2 border-liliana-primary rounded-md' alt="kiko"/>
                                    <img src="/assets/amirataraboriginal.jpg" className='max-w-10 border cursor-pointer hover:scale-105 duration-300 hover:border-2 hover:border-liliana-primary hover:rounded-md' alt="amiratarab" />
                                    <img src="/assets/product.webp" className='max-w-10 border cursor-pointer hover:scale-105 duration-300 hover:border-2 hover:border-liliana-primary hover:rounded-md' alt="packfakhama" />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} m={6} sx={{flexDirection:'column'}} display={'flex'} justifyContent={'space-between'}>
                                <Grid item>
                                    <Typography variant='h5'>GLOSSE KIKO MILANO</Typography>
                                    <Divider/>
                                    <p className=''>80.00DH</p>
                                </Grid>
                                <Grid item display={'flex'} sx={{flexDirection:'column'}} gap={1} >
                                    <Rating name="size-small" defaultValue={2} size="small" />
                                    <Button variant='contained' color='liliana_primary' className='h-8'><BiPlusCircle/> Add</Button>
                                    <Button variant='contained' color='liliana_secondary' className='h-8'><BiCartAdd/> Buy</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid> 
            <Grid container justifyContent={'space-between'}>
                <Grid item sm={12} md={7} className='bg-white p-4 border mt-2 rounded-md'>
                    <p className='font-bold font-Poppins flex items-center gap-1 text-liliana-third'><BiInfoCircle/>Description</p>
                    <Divider className='my-2'/>
                    <p className='text-sm font-Roboto px-6'>
                    dr.lana cleaning SOFT SKIN AVOCADO & HONEYl scrub deeply cleaning skin and oil balance paraben free . deep mosture oil free 170g Gommage hyper top pour celle qui veulent éclaircir naturellement ou avoir une très belle peau Éclatante toujours la pour vous مقشر فائق الجودة لأولئك الذين يرغبون في تفتيح البشرة بشكل طبيعي أو الحصول على بشرة متوهجة جميلة جدًا دائمًا من أجلك A superior exfoliant for those who want to lighten skin naturally or have a very beautiful glowing skin always for you
                    </p>
                </Grid>
                <Grid item sm={12} md={4.9} className='bg-white p-4 border mt-2 rounded-md'>
                    <p className='font-bold font-Poppins flex items-center gap-2 text-liliana-third'>Information</p>
                    <Divider className='my-2'/>
                    <Box ml={2}>
                        <p className='text-xs flex items-center gap-1'><span className='text-sm font-bold'>Category:</span>Maquillage</p>
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
                <SuggestionCard title='اميرة العرب ORIGINAL 100ML' image='/assets/amirataraboriginal.jpg' price={250}/>
                <SuggestionCard title='GLOSSE KIKO MILANO' image='/assets/kiko.jpg' price={70}/>
                <SuggestionCard title='PHILOS 100ML ORIGINAL' image='/assets/philos.jpg' price={300}/>
                <SuggestionCard title='Pack AL FAKHAMA' image='/assets/packalfakhama.jpeg' price={300}/>
                <SuggestionCard title='Pack ITARA' image='/assets/packitara.jpeg' price={210}/>
            </Grid>
        </Container>
    </div>
    </>
  )
}

export default product;