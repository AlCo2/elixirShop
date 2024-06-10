
import { Alert, Avatar, Box, Container, Grid, IconButton } from '@mui/material'
import Sidebar from './components/Sidebar';
import { BiBell, BiSearch } from 'react-icons/bi';
import { usePage } from '@inertiajs/react';

export default function DashboardLayout({children}){
  const { flash } = usePage().props;
  return (
      <>
        <div className='min-h-screen bg-liliana-background'>
          <Grid container className='min-h-screen'>
            <Sidebar/>
            <Grid item xs md={10} py={2}>
              {flash.error && 
                <Alert severity="error" sx={{mt:2}}>{flash.error}</Alert>
              }
              {children}
            </Grid>
          </Grid>
        </div>
      </>
  )
}