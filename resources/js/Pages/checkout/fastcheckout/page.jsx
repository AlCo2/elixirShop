import { Box, Button, Container, Divider, FormControl, Grid, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react'
import Navbar from '../../components/Navbar';

const page = () => {
    const [province, setProvince] = useState('');
    const [country, setCountry] = useState('');

    const handleProvinceChange = (event) => {
        setProvince(event.target.value);
    };

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    };

  return (
    <> 
        <div className='min-h-screen bg-liliana-background py-5'>
            <Container>
                <Grid container justifyContent={'center'}>
                    <Grid item xs={12} md={6} className='border rounded-md'>
                        <Box className='bg-gray-100 rounded-t-md p-4'>
                            <p className='font-Opensans text-xl font-semibold mb-2'>Checkout</p>
                            <Divider/>
                            <Box sx={{display:'flex', justifyContent:'space-between',my:1}}>
                                <div>
                                    <p className='opacity-70 text-sm font-Poppins'>Discount:</p>
                                </div>
                                <div>
                                    <p className='font-semibold text-sm font-Opensans'>0DH</p>
                                </div>
                            </Box>
                            <Box sx={{display:'flex', justifyContent:'space-between',my:1}}>
                                <div>
                                    <p className='opacity-70 text-sm font-Poppins'>Delivery:</p>
                                </div>
                                <div>
                                    <p className='font-semibold text-sm font-Opensans'>free</p>
                                </div>
                            </Box>
                            <Box sx={{display:'flex', justifyContent:'space-between'}}>
                                <div>
                                    <p className='opacity-70 text-sm font-Poppins'>Total:</p>
                                </div>
                                <div>
                                    <p className='font-semibold text-sm font-Opensans'>550DH</p>
                                </div>
                            </Box>
                        </Box>
                        <Box className='bg-white rounded-b-md p-4'>
                            <div className='mb-3'>
                                <p className='opacity-70 text-sm font-Poppins'>Payment Address</p>
                            </div>
                            <Grid container columns={12} gap={1}>
                                <Grid xs={12} md={5.9} item>
                                    <div>
                                        <label className='text-sm font-semibold font-Opensans'>First Name</label>
                                    </div>
                                    <input type="text" className='border-2 rounded-md h-8 focus:outline-blue-400 p-1 text-sm w-full' name="" id="" />
                                </Grid>
                                <Grid xs={12} md={5.9} item>
                                    <div>
                                        <label className='text-sm font-semibold font-Opensans'>Last Name</label>
                                    </div>
                                    <input type="text" className='border-2 rounded-md h-8 focus:outline-blue-400 p-1 text-sm w-full' name="" id="" />
                                </Grid>
                                <Grid xs={12} md={5.9} item>
                                    <div>
                                        <label className='text-sm font-semibold font-Opensans'>Country</label>
                                    </div>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={country}
                                            className='h-8 text-black'
                                            onChange={handleCountryChange}
                                        >
                                            <MenuItem value={10}>Morocco</MenuItem>
                                            <MenuItem value={20}>Spain</MenuItem>
                                            <MenuItem value={30}>France</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid xs={12} md={5.9} item>
                                    <div>
                                        <label className='text-sm font-semibold font-Opensans'>City</label>
                                    </div>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={province}
                                            className='h-8 text-black'
                                            onChange={handleProvinceChange}
                                        >
                                            <MenuItem value={10}>Kenitra</MenuItem>
                                            <MenuItem value={20}>rabat</MenuItem>
                                            <MenuItem value={30}>Fes</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid xs={12} item>
                                    <div>
                                        <label className='text-sm font-semibold font-Opensans'>Address</label>
                                    </div>
                                    <Box>
                                        <input type="text" className='border-2 rounded-md h-8 focus:outline-blue-400 p-1 text-sm w-full' name="" id="" />
                                    </Box>
                                </Grid>
                                <Grid xs={12} md={5.9} item>
                                    <div>
                                        <label className='text-sm font-semibold font-Opensans'>Zip/Post Code</label>
                                    </div>
                                    <input type="text" className='border-2 rounded-md h-8 focus:outline-blue-400 p-1 text-sm w-full' name="" id="" />
                                </Grid>
                                <Grid xs={12} md={5.9} item>
                                    <div>
                                        <label className='text-sm font-semibold font-Opensans'>Phone</label>
                                    </div>
                                    <input type="text" className='border-2 rounded-md h-8 focus:outline-blue-400 p-1 text-sm w-full' name="" id="" />
                                </Grid>
                                <Grid xs={12} item mt={3}>
                                    <Box sx={{display:'flex', justifyContent:'space-between'}}>
                                        <Button href='/checkout' variant='outlined' size='small' color='liliana_primary' sx={{fontFamily:'Roboto'}} className='font-Poppins'>Back</Button>
                                        <Button variant='contained' size='small' color='liliana_primary' sx={{fontFamily:'Roboto'}}>Continue</Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    </>
  )
}

export default page;