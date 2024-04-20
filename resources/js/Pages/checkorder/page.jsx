import Layout from '@/Layout';
import { Box, Button, Container, Divider } from '@mui/material';
import { FaKey } from 'react-icons/fa';
import { MdEmail } from "react-icons/md";
const page = () => {
  return (
    <>
        <div className='min-h-80 bg-liliana-background'>
            <Container>
                <Box pt={1} mb={1}>
                    <p className='text-xl font-Poppins font-medium'>Fill in details to check order</p>
                    <p className='text-sm opacity-70 font-medium'>Easly Locate the details of your orders</p>
                </Box>
                <Divider/>
                <div className='flex justify-center items-center pt-5'>
                    <div className='w-fit p-10 rounded-md border bg-white'>
                        <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
                            <Box sx={{display:'flex', gap:2, alignItems:'center'}}>
                                <p className='w-32 font-Roboto font-medium opacity-70 flex items-center gap-1'><FaKey/> Order Id</p>
                                <input type="text" className='border rounded-md h-8 focus:outline-blue-400 p-1 text-sm w-full' name="" id="" />
                            </Box>
                            <Box sx={{display:'flex', gap:2, alignItems:'center'}} mt={2}>
                            <p className='w-32 font-Roboto font-medium opacity-70 flex items-center gap-1'><MdEmail/> Email</p>
                                <input type="text" className='border rounded-md h-8 focus:outline-blue-400 p-1 text-sm w-full' name="" id="" />
                            </Box>
                        </Box>
                        <Box sx={{display:'flex', justifyContent:'space-between', gap:1}} mt={2}>
                            <Button href='/' variant='outlined' size='small' color='liliana_third' className='font-Roboto'>Back</Button>
                            <Button variant='contained' size='small' color='liliana_third' className='font-Roboto'>Continue</Button>
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