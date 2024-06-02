
import { Avatar, Box, Container, Grid, IconButton } from '@mui/material'
import Sidebar from './components/Sidebar';
import { BiBell, BiSearch } from 'react-icons/bi';

export default function DashboardLayout({children}){ 
  return (
      <>
        <div className='min-h-screen bg-liliana-background'>
          <Grid container className='min-h-screen'>
            <Sidebar/>
            <Grid item xs md={10} >
              {children}
            </Grid>
          </Grid>
        </div>
      </>
  )
}