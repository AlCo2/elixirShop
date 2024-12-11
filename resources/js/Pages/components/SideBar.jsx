import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { FaBars, FaUserCheck } from "react-icons/fa";
import {BsHouse, BsShop, BsTelephone, BsTicket} from 'react-icons/bs'
import { AiOutlineUser } from 'react-icons/ai'
import { IoClose, IoManOutline, IoWomanOutline } from "react-icons/io5";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { RiArrowDropDownLine, RiQuestionMark } from 'react-icons/ri';
import { CiLogin, CiSettings } from "react-icons/ci";
import { CiCircleCheck } from "react-icons/ci";
import { RiShieldUserFill } from "react-icons/ri";
import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { BiUser } from 'react-icons/bi';
import { IconButton } from '@mui/material';


const NavItem = ({title, path}) => {
  const pathname = window.location.pathname
  return (
      <a className={`h-10 flex font-Roboto items-center pl-4 w-full duration-300 font-bold hover:bg-gray-100 ${pathname===path?'bg-gray-100 opacity-100':'bg-white opacity-50'}`} href={path}>{title}</a>
  )
}
export default function SideBar() {
  const [open, setOpen] = useState(false);
  const { auth } = usePage().props;
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
          <ListItem>
            <IconButton onClick={toggleDrawer(false)}>
              <IoClose />
            </IconButton>
          </ListItem>
          <ListItem>
            <a href='/' className='flex items-center ml-2 text-xl font-bold font-Poppins duration-300'>Elixir</a>
          </ListItem>
          <ListItem disablePadding>
            <NavItem title={"Home"} path={'/'}/>
          </ListItem>
          <ListItem disablePadding>
            <NavItem title={"Store"} path={'/store'}/>
          </ListItem>
          <ListItem disablePadding>
            <NavItem title={"Man"} path={'/store/man'}/>
          </ListItem>
          <ListItem disablePadding>
          <NavItem title={"Woman"} path={'/store/woman'}/>
          </ListItem>
          <ListItem disablePadding>
            <NavItem title={"Support"} path={'/support'}/>
          </ListItem>
          {auth.user && auth.user.role_id==1?
          <ListItem disablePadding>
            <ListItemButton href='/dashboard'>
              <ListItemIcon>
                <CiSettings/>
              </ListItemIcon>
              <ListItemText primary={"Dashboard"} />
            </ListItemButton>
          </ListItem>
          :
          null
          }
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
                {auth.user?
                  <List disablePadding>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <BiUser/>
                      </ListItemIcon>
                      <ListItemText primary={auth.user.firstname} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                  <Link method='post' as='button' href='/logout' className='w-full'>
                    <ListItemButton>
                        <ListItemIcon>
                          <CiLogin/>
                        </ListItemIcon>
                        <ListItemText primary="Logout" />                      
                    </ListItemButton>
                    </Link>
                  </ListItem>
                </List>
                :
                <List disablePadding>
                  <ListItem disablePadding>
                    <ListItemButton href='/login'>
                      <ListItemIcon>
                        <CiLogin/>
                      </ListItemIcon>
                      <ListItemText primary="Login" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton href='/register'>
                      <ListItemIcon>
                        <RiShieldUserFill/>
                      </ListItemIcon>
                      <ListItemText primary="Register" />
                    </ListItemButton>
                  </ListItem>
                </List>
                }
                <Divider />
                  <ListItem disablePadding>
                    <ListItemButton href='checkorder'>
                      <ListItemIcon>
                        <CiCircleCheck/>
                      </ListItemIcon>
                      <ListItemText primary="Check Order" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton href='support'>
                      <ListItemIcon>
                        <RiQuestionMark/>
                      </ListItemIcon>
                      <ListItemText primary="Support" />
                    </ListItemButton>
                  </ListItem>
                  {auth.user &&
                  <ListItem disablePadding>
                    <ListItemButton href='/orders'>
                      <ListItemIcon>
                        <FaUserCheck/>
                      </ListItemIcon>
                      <ListItemText primary="My Orders" />
                    </ListItemButton>
                  </ListItem>
                  }
              </Box>
            </AccordionDetails>
          </Accordion>
      </List>
    </Box>
  );
  return (
    <div>
      <IconButton onClick={toggleDrawer(true)} color='liliana_dark'>
        <FaBars/>
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor='right'>
        {DrawerList}
      </Drawer>
    </div>
  );
}