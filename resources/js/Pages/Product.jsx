import { Box, Button, Chip, Container, Divider, Grid, Paper, Rating, ThemeProvider, Typography, createTheme } from '@mui/material';
import React from 'react'
import { BiCartAdd, BiInfoCircle, BiPlusCircle } from 'react-icons/bi';
import SuggestionCard from './components/SuggestionCard';
import Navbar from '@/Pages/components/Navbar';
import { theme } from '@/theme';

const Product = () => {
  return (
    <>
    <Navbar/>
    <div className='bg-liliana-background'>
        <Container className='min-h-screen py-5'>
            <Paper sx={{ maxWidth:870, position:'relative'}} variant='outlined' >
                <Grid container columns={16} justifyContent={'center'} >
                    <Grid item xs={12} sm={5} sx={{display:{sm:'flex'},flexDirection:{sm:'row-reverse'}, gap:2}}>
                        <Box height={250} display={'flex'} justifyContent={'center'}>
                            <img src="/assets/product.webp" className='max-w-56 min-w-36' alt="packfakhama" />
                        </Box>
                        <Box sx={{display:'flex', gap:1, justifyContent:'center', flexDirection:{sm:'column'}}}>
                            <img src="/assets/product.webp" className='max-w-10 cursor-pointer hover:scale-105 duration-300 border-2 border-liliana-primary rounded-md' alt="packfakhama"/>
                            <img src="/assets/product.webp" className='max-w-10 cursor-pointer hover:scale-105 duration-300 hover:border-2 hover:border-liliana-primary hover:rounded-md' alt="packfakhama" />
                            <img src="/assets/product.webp" className='max-w-10 cursor-pointer hover:scale-105 duration-300 hover:border-2 hover:border-liliana-primary hover:rounded-md' alt="packfakhama" />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} m={6} sx={{display:'flex', flexDirection:'column'}} justifyContent={'space-between'}>
                        <Grid item>
                            <Typography variant='h5'>GLOSSE KIKO MILANO</Typography>
                            <Divider/>
                            <p className=''>80.00DH</p>
                        </Grid>
                        <Grid item sx={{display:'flex', flexDirection:'column'}} gap={1} >
                            <Rating name="size-small" defaultValue={2} size="small" />
                            <ThemeProvider theme={theme}>
                                <Button variant='contained' color='liliana_third' className='hover:bg-rose-400 h-8'><BiPlusCircle/> Add</Button>
                            </ThemeProvider>
                            <ThemeProvider theme={theme}>
                                <Button variant='contained' color='liliana_secondary' className='bg-liliana-secondary hover:bg-violet-800 h-8'><BiCartAdd/> Buy</Button>
                            </ThemeProvider>
                        </Grid>
                    </Grid>
                    <Grid position={'absolute'} top={5} right={10} item>
                        <Chip color='error' label="Out of stock" />
                    </Grid>
                </Grid>
            </Paper>
            <Paper sx={{marginTop:2, maxWidth:870}} variant='outlined'>
                <Grid container>
                    <Grid item margin={2}>
                        <p className='font-bold font-Poppins flex items-center gap-2'><BiInfoCircle/>Description</p>
                        <Divider/>
                        <p className='mt-2 text-sm'>
                        dr.lana cleaning SOFT SKIN AVOCADO & HONEYl scrub deeply cleaning skin and oil balance paraben free . deep mosture oil free 170g Gommage hyper top pour celle qui veulent éclaircir naturellement ou avoir une très belle peau Éclatante toujours la pour vous مقشر فائق الجودة لأولئك الذين يرغبون في تفتيح البشرة بشكل طبيعي أو الحصول على بشرة متوهجة جميلة جدًا دائمًا من أجلك A superior exfoliant for those who want to lighten skin naturally or have a very beautiful glowing skin always for you
                        </p>
                    </Grid>
                </Grid>
            </Paper>
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

export default Product;