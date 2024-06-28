import Layout from '@/Layout';
import { router } from '@inertiajs/react';
import { Box, Button, Container, Divider } from '@mui/material';
import { useState } from 'react';
import { FaKey } from 'react-icons/fa';
import { MdEmail } from "react-icons/md";
const page = () => {
    const [values, setValues] = useState({
        order_id:"",
        email:"",
    })
    function handleChange(e) {
        const { id, value, type } = e.target;
        setValues(prevValues => ({
          ...prevValues,
          [id]: type === 'file' ? e.target.files[0] : value, // If it's a file input, get the file, otherwise get the value
        }));
    }
    function handleSubmit(e){
        router.get('/showorder', values);
    }
return (
    <>
        <div className='min-h-80 bg-liliana-background'>
            <Container>
                <Box pt={1} mb={1}>
                    <p className='text-xl font-Opensans font-medium'>Fill in details to check order</p>
                    <p className='text-sm opacity-70 font-medium'>Easly Locate the details of your orders</p>
                </Box>
                <Divider/>
                <div className='flex justify-center items-center pt-5'>
                    <div className='w-fit p-10 rounded-md border bg-white'>
                        <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
                            <Box sx={{display:'flex', gap:2, alignItems:'center'}}>
                                <p className='w-32 font-Roboto font-medium opacity-70 flex items-center gap-1'><FaKey/> Order Id</p>
                                <input value={values.id} onChange={handleChange} type="text" className='border rounded-md h-8 focus:outline-blue-400 p-1 text-sm w-full' name="order_id" id="order_id" />
                            </Box>
                            <Box sx={{display:'flex', gap:2, alignItems:'center'}} mt={2}>
                            <p className='w-32 font-Roboto font-medium opacity-70 flex items-center gap-1'><MdEmail/> Email</p>
                                <input value={values.email} onChange={handleChange} type="text" className='border rounded-md h-8 focus:outline-blue-400 p-1 text-sm w-full' name="email" id="email" />
                            </Box>
                        </Box>
                        <Box sx={{display:'flex', justifyContent:'space-between', gap:1}} mt={2}>
                            <Button href='/' variant='outlined' size='small' color='liliana_dark' className='font-Roboto'>Back</Button>
                            <Button variant='contained' size='small' color='liliana_dark' onClick={handleSubmit} className='font-Roboto'>Continue</Button>
                        </Box>
                    </div>
                </div>
            </Container>
        </div>
    </>
  )
}

page.layout = page => <Layout children={page} tite="Checkorder" />
export default page;