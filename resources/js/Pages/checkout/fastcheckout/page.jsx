import { Box, Button, Container, Divider, FormControl, Grid, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar';
import { gridColumnLookupSelector } from '@mui/x-data-grid';
import { router } from '@inertiajs/react';

const page = ({order}) => {
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [values, setValues] = useState({
        firstname:"",
        lastname:"",
        country: "Morocco",
        city:"Kenitra",
        address: "",
        zip: "",
        phone: "",
        order: order,
    })
    function handleSelectChange(e) {
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
        router.post('/api/order/create', values);
      }
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
                                </Grid>
                                <Grid xs={12} md={5.9} item>
                                    <div>
                                        <label className='text-sm font-semibold font-Opensans'>Last Name</label>
                                    </div>
                                    <input onChange={handleChange} value={values.lastname} type="text" className='border-2 rounded-md h-8 focus:outline-blue-400 p-1 text-sm w-full' name="lastname" id="lastname" />
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
                                            defaultValue={'Morocco'}
                                            className='h-8 text-black'
                                            onChange={handleSelectChange}
                                        >
                                            {/* {countries & countries.map((country)=>(
                                                <MenuItem value={country.cca3}>{country.name.common}</MenuItem>
                                            ))} */}
                                            <MenuItem value={'Morocco'}>Morocco</MenuItem>
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
                                            defaultValue={'Kenitra'}
                                            className='h-8 text-black'
                                            onChange={handleSelectChange}
                                        >
                                            <MenuItem value={'Kenitra'}>Kenitra</MenuItem>
                                            <MenuItem value={'rabat'}>rabat</MenuItem>
                                            <MenuItem value={'fes'}>Fes</MenuItem>
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
                                </Grid>
                                <Grid xs={12} md={5.9} item>
                                    <div>
                                        <label className='text-sm font-semibold font-Opensans'>Zip/Post Code</label>
                                    </div>
                                    <input onChange={handleChange} value={values.zip} type="text" className='border-2 rounded-md h-8 focus:outline-blue-400 p-1 text-sm w-full' name="zip" id="zip" />
                                </Grid>
                                <Grid xs={12} md={5.9} item>
                                    <div>
                                        <label className='text-sm font-semibold font-Opensans'>Phone</label>
                                    </div>
                                    <input onChange={handleChange} value={values.phone} type="text" className='border-2 rounded-md h-8 focus:outline-blue-400 p-1 text-sm w-full' name="phone" id="phone" />
                                </Grid>
                                <Grid xs={12} item mt={3}>
                                    <Box sx={{display:'flex', justifyContent:'space-between'}}>
                                        <Button href='/checkout' variant='outlined' size='small' color='liliana_primary' sx={{fontFamily:'Roboto'}} className='font-Poppins'>Back</Button>
                                        <Button onClick={handleSubmite} variant='contained' size='small' color='liliana_primary' sx={{fontFamily:'Roboto'}}>Continue</Button>
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