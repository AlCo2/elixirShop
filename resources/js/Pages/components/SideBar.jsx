'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { FaBars } from "react-icons/fa";
import {BsHouse, BsShop, BsTicket, } from 'react-icons/bs'
import { AiOutlineUser } from 'react-icons/ai'
import { IoClose } from "react-icons/io5";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { CiLogin } from "react-icons/ci";
import { CiCircleCheck } from "react-icons/ci";
import { RiShieldUserFill } from "react-icons/ri";

export default function SideBar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
          <ListItem>
            <IoClose className='cursor-pointer text-xl' onClick={toggleDrawer(false)}/>
          </ListItem>
          <ListItem>
            <a href='/' className='flex items-center ml-2'>
              <img className='rounded-lg' src="/assets/lilianacolorfullogo.jpg" width={50} alt="logo" />
              <p className="text-xl font-bold font-Poppins ml-2 duration-300">Liliana</p>
            </a>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton href='/'>
              <ListItemIcon>
                <BsHouse/>
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton href='/store'>
              <ListItemIcon>
                <BsShop/>
              </ListItemIcon>
              <ListItemText primary={"Store"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <BsTicket/>
              </ListItemIcon>
              <ListItemText primary={"Promotions"} />
            </ListItemButton>
          </ListItem>
          <Accordion>
            <AccordionSummary
              expandIcon={<RiArrowDropDownLine/>}
              aria-controls="panel2-content"
              id="panel2-header"
            >
            <ListItemIcon>
              <AiOutlineUser/>
            </ListItemIcon>
            <ListItemText primary={'account'}/>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ width: '100%'}}>
                <List disablePadding>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <CiLogin/>
                      </ListItemIcon>
                      <ListItemText primary="Login" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <RiShieldUserFill/>
                      </ListItemIcon>
                      <ListItemText primary="Register" />
                    </ListItemButton>
                  </ListItem>
                </List>
                <Divider />
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <CiCircleCheck/>
                      </ListItemIcon>
                      <ListItemText primary="Check Order" />
                    </ListItemButton>
                  </ListItem>
              </Box>
            </AccordionDetails>
          </Accordion>
      </List>
    </Box>
  );
  return (
    <div>
      <FaBars onClick={toggleDrawer(true)} className='text-white mr-2 cursor-pointer hover:text-black text-2xl duration-300'/>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor='right'>
        {DrawerList}
      </Drawer>
    </div>
  );
}