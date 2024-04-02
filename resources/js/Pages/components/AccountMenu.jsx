'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { AiOutlineUser } from 'react-icons/ai'
import { CiLogin } from "react-icons/ci";
import { CiCircleCheck } from "react-icons/ci";
import { RiShieldUserFill } from "react-icons/ri";
import { Link, usePage } from '@inertiajs/react';
import { List } from '@mui/material';

export default function AccountMenu() {
  const { auth } = usePage().props
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip>
          <IconButton
            onClick={handleClick}
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <AiOutlineUser className={auth.user?'text-liliana-third':'text-white'}/>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {!auth.user?
        <List>
          <Link href='/login'>
          <MenuItem onClick={handleClose}>
              <ListItemIcon>
                  <CiLogin/>
              </ListItemIcon>
              Login
          </MenuItem>
          </Link>
          
          <Link href='/register'>
          <MenuItem onClick={handleClose}>
              <ListItemIcon>
                  <RiShieldUserFill/>
              </ListItemIcon>
              Register
          </MenuItem>
          </Link>
          <Divider />
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <CiCircleCheck/>
            </ListItemIcon>
            check Order
          </MenuItem>
        </List>
        :
        <List>
          <Box sx={{display:'flex', justifyContent:'center', mb:2}}>
            <p>{auth.user.name}</p>
          </Box>
          <Divider />
          <Link href='/profile'>
            <MenuItem onClick={handleClose}>
                <ListItemIcon>
                    <RiShieldUserFill/>
                </ListItemIcon>
                Profile
            </MenuItem>
          </Link>
          <Link href='/logout'>
            <MenuItem onClick={handleClose}>
                <ListItemIcon>
                    <CiLogin className='text-red-500'/>
                </ListItemIcon>
                <p className='text-red-500 w-24'>Logout</p>
            </MenuItem>
          </Link>
        </List>
        }
      </Menu>
    </React.Fragment>
  );
}
