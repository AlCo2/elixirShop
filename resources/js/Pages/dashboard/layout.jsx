
import { Avatar, Box, Container, Grid, IconButton } from '@mui/material'
import Sidebar from './components/Sidebar';
import { BiBell, BiSearch } from 'react-icons/bi';

const page = () => { 
  return (
    <>
        <div className='min-h-screen bg-liliana-background'>
          <Grid container className='min-h-screen'>
            <Sidebar/>
            <Grid item xs={10} className=''>
              <Container>
                <Box sx={{height:60,bgcolor:'white', mt:2, display:'flex', alignItems:'center', justifyContent:'space-between', borderRadius:2}}>
                  <Box sx={{ml:2}}>
                    <label className='relative'>
                      <BiSearch className='absolute top-1 right-2'/>
                      <input type="text" placeholder='Search' className='border w-72 h-8 focus:outline-blue-400 p-1 text-sm' name="" id="" />
                    </label>
                  </Box>
                  <Box sx={{ mr:2, display:'flex', alignItems:'center', gap:1}}>
                    <IconButton><BiBell/></IconButton>
                    <Avatar alt="Abdou lahboub" src="https://cdn.britannica.com/55/188355-050-D5E49258/Salvatore-Corsitto-The-Godfather-Marlon-Brando-Francis.jpg" />
                  </Box>
                </Box>
              </Container>
              children
            </Grid>
          </Grid>
        </div>
    </>
  )
}

export default page;