import { useState } from 'react'
import { Grid, List, ListItemButton, Collapse, Box, IconButton, Button } from '@mui/material'
import { BiMessage, BiSolidDashboard, BiStore, BiUser } from 'react-icons/bi';
import { FaAngleDown, FaAngleUp, FaBars, FaBuffer, FaCalculator, FaCalendarCheck, FaDolly } from 'react-icons/fa';
import { Link } from '@inertiajs/react';


const Sidebar = () => {
    const pathname = window.location.pathname;
    const [selectedIndex, setSelectedIndex] = useState(1);
    const [open, setOpen] = useState(false);
    const [sideOpen, setSideOpen] = useState(false);
    
    const style = (path) =>{
        return {
            display:'flex', 
            gap:'0.25rem',
            ":hover":{opacity:'1', bgcolor:'rgb(30, 58, 138, 0.7)', color:'rgb(96, 165, 250)'},
            bgcolor:pathname===path?'rgb(30, 58, 138, 0.7)':'',
            color:pathname===path?'rgb(96, 165, 250)':'white',
            opacity:pathname===path?'':'0.7',
            transitionDuration:'300ms',
            borderRadius:'0.375rem',
            height:'2.5rem',
            fillOpacity:10,
        }
    }
    const handleClick = () => {
        setOpen(!open);
    };
    return (
    <>
        <Grid className='pl-4 pt-2 xl:hidden' item height={30} xs={12}>
            <button onClick={()=>setSideOpen(true)} className={'text-black mr-2 cursor-pointer hover:text-blue-500 text-2xl duration-300 ' +(sideOpen?'hidden':'')} ><FaBars/></button>
        </Grid>
        <Grid item xs md={2} className={'bg-gray-900 max-xl:fixed max-xl:top-0 max-xl:left-0 max-xl:h-full max-xl:z-10 max-xl:w-56 max-xl:duration-300 '+ (sideOpen?'max-xl:translate-x-0':'max-xl:-translate-x-full')}>
            <div className='text-center mt-4'>
                <p className='text-xl font-Poppins text-white font-semibold'>Dashboard</p>
                <button className='text-white absolute right-2 top-0 xl:hidden' onClick={()=>{setSideOpen(false)}}>X</button>
            </div>
            <div className='p-4'>
            <List className='flex flex-col gap-1'>
                <ListItemButton LinkComponent={Link} href='/dashboard' sx={style('/dashboard')}>
                    <BiSolidDashboard/>
                    <p>Overview</p>
                </ListItemButton>
                <ListItemButton LinkComponent={Link} href='/dashboard/customer' sx={style('/dashboard/customer')} className={'flex gap-1 duration-500 rounded-md h-10 hover:opacity-100 hover:bg-blue-900 hover:text-blue-400 ' + (pathname==='/dashboard/customer'?'bg-blue-900 bg-opacity-70 text-blue-400':'text-white opacity-70')}>
                    <BiUser/>
                    <p>Customer</p>
                </ListItemButton>
                <ListItemButton LinkComponent={Link} sx={{display:'flex', gap:'0.25rem', justifyContent:'space-between',transitionDuration:'300ms', color:'white', opacity:'0.7', borderRadius:'0.375rem',":hover":{opacity:'1', bgcolor:'rgb(30, 58, 138, 0.7)', color:'rgb(96, 165, 250)'},height:'2.5rem'}} onClick={handleClick}>
                <div className='flex gap-1 items-center'>
                    <FaDolly/>
                    <p>Products</p>
                </div>
                {open ? <FaAngleUp /> : <FaAngleDown/>}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                <List sx={{pl:2}} className='flex flex-col gap-1' disablePadding>
                    <ListItemButton LinkComponent={Link} href='/dashboard/product' sx={style('/dashboard/product')}>
                    <FaCalculator/>
                    <p>Stock</p>
                    </ListItemButton>
                    <ListItemButton LinkComponent={Link} href='/dashboard/category' sx={style('/dashboard/category')}>
                    <FaBuffer/>
                    <p>Category</p>
                    </ListItemButton>
                </List>
                </Collapse>
                <ListItemButton LinkComponent={Link} href='/dashboard/message' sx={style('/dashboard/message')}>
                    <BiMessage/>
                    <p>Messages</p>
                </ListItemButton>
                <ListItemButton LinkComponent={Link} href='/dashboard/order' sx={style('/dashboard/order')}>
                    <FaCalendarCheck/>
                    <p>Order</p>
                </ListItemButton>
                <ListItemButton LinkComponent={Link} href='/' sx={style('/dashboard/SiteWeb')}>
                    <BiStore/>
                    <p>Store</p>
                </ListItemButton>
            </List>
            </div>
        </Grid>
    </>
  )
}

export default Sidebar;