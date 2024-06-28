import { Box, Button, Container, Divider, FormControl, Grid, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react'
import { router, usePage } from '@inertiajs/react';
import Layout from '@/Layout';
import InputError from '@/Components/InputError';
import { useEffect } from 'react';

const page = ({ order }) => {
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const { auth, errors } = usePage().props;

    const [values, setValues] = useState({
        user_id: auth.user?auth.user.id:null,
        firstname:auth.user?auth.user.firstname:"",
        lastname:auth.user?auth.user.lastname:"",
        country: "",
        city:"",
        address: auth.user?auth.user.address:"",
        zip: "",
        phone:auth.user?auth.user.phone:"",
        order: order,
    })
    function handleCountryChange(e) {
        const { name, value } = e.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: value.country,
        }));
        setCities(value.cities);
    }
    function handleCityChange(e) {
        const { name, value } = e.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }));
    }
    function handleChange(e) {
    const { id, value, type } = e.target;
    setValues(prevValues => ({
        ...prevValues,
        [id]: type === 'file' ? e.target.files[0] : value, // If it's a file input, get the file, otherwise get the value
    }));
    }

    function handleSubmite(e)
    {
        const response = router.post('/order/create', values);
        
    }

    const fetchdata = async () =>{
        const response = await fetch('https://countriesnow.space/api/v0.1/countries').then((res)=>res.json());
        setCountries(response.data);
    }
    useEffect(()=>{
        fetchdata();
    }, [])
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
                                    <p className='font-semibold text-sm font-Opensans'>{order.total}DH</p>
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
                                    <input value={values.firstname} type="text" className='border-2 rounded-md h-8 focus:outline-blue-400 p-1 text-sm w-full' name="firstname" id="firstname" onChange={handleChange} />
                                    <InputError message={errors.firstname} className="" />
                                </Grid>
                                <Grid xs={12} md={5.9} item>
                                    <div>
                                        <label className='text-sm font-semibold font-Opensans'>Last Name</label>
                                    </div>
                                    <input onChange={handleChange} value={values.lastname} type="text" className='border-2 rounded-md h-8 focus:outline-blue-400 p-1 text-sm w-full' name="lastname" id="lastname" />
                                    <InputError message={errors.lastname} className="" />
                                </Grid>
                                <Grid xs={12} md={5.9} item>
                                    <div>
                                        <label className='text-sm font-semibold font-Opensans'>Country</label>
                                    </div>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="country"
                                            name='country'
                                            className='h-8 text-black'
                                            defaultValue={""}
                                            onChange={handleCountryChange}
                                        >
                                        {countries.map((country)=>(
                                            <MenuItem key={country.country} value={country}>{country.country}</MenuItem>
                                        ))}
                                            
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
                                            id="city"
                                            name='city'
                                            defaultValue={""}
                                            className='h-8 text-black'
                                            onChange={handleCityChange}
                                        >
                                            {cities.map((city)=>(
                                                <MenuItem key={city} value={city}>{city}</MenuItem>
                                            ))}
                                            
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid xs={12} item>
                                    <div>
                                        <label className='text-sm font-semibold font-Opensans'>Address</label>
                                    </div>
                                    <Box>
                                        <input onChange={handleChange} value={values.address} type="text" className='border-2 rounded-md h-8 focus:outline-blue-400 p-1 text-sm w-full' name="address" id="address" />
                                    </Box>
                                    <InputError message={errors.address} className="" />
                                </Grid>
                                <Grid xs={12} md={5.9} item>
                                    <div>
                                        <label className='text-sm font-semibold font-Opensans'>Zip/Post Code</label>
                                    </div>
                                    <input onChange={handleChange} value={values.zip} type="text" className='border-2 rounded-md h-8 focus:outline-blue-400 p-1 text-sm w-full' name="zip" id="zip" />
                                    <InputError message={errors.zip} className="" />
                                </Grid>
                                <Grid xs={12} md={5.9} item>
                                    <div>
                                        <label className='text-sm font-semibold font-Opensans'>Phone</label>
                                    </div>
                                    <input onChange={handleChange} value={values.phone} type="text" className='border-2 rounded-md h-8 focus:outline-blue-400 p-1 text-sm w-full' name="phone" id="phone" />
                                    <InputError message={errors.phone} className="" />
                                </Grid>
                                <Grid xs={12} item mt={3}>
                                    <Box sx={{display:'flex', justifyContent:'space-between'}}>
                                        <Button href='/checkout' variant='outlined' size='small' color='liliana_dark' sx={{fontFamily:'Roboto'}} className='font-Poppins'>Back</Button>
                                        <Button onClick={handleSubmite} variant='contained' size='small' color='liliana_dark' sx={{fontFamily:'Roboto'}}>Continue</Button>
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

page.layout = page => <Layout children={page} tite="FastCheckout" />
export default page;