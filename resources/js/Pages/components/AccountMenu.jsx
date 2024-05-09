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
import { BiUser } from 'react-icons/bi';
import { List } from '@mui/material';
import { Fragment, useState } from 'react';
import { FaUserCheck } from 'react-icons/fa';

export default function AccountMenu() {
  const { auth } = usePage().props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip>
          <IconButton
            onClick={handleClick}
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <AiOutlineUser className={auth.user?'text-black':'text-white'}/>
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
            width:160,
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
          <Link href='/checkorder'>
            <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <CiCircleCheck/>
                </ListItemIcon>
                  check Order
            </MenuItem>
          </Link>
        </List>
        :
        <List>
          <Link>
            <MenuItem onClick={handleClose}>
                <ListItemIcon>
                    <BiUser/>
                </ListItemIcon>
                {auth.user.firstname}
            </MenuItem>
          </Link>
          <Divider />
          <Link href='/checkorder'>
            <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <CiCircleCheck/>
                </ListItemIcon>
                  check Order
            </MenuItem>
          </Link>
          <Link href='/orders'>
            <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <FaUserCheck/>
                </ListItemIcon>
                  My Orders
            </MenuItem>
          </Link>
          <Divider />
          <Link method='post' as='button' href='/logout' className='w-full'>
            <MenuItem onClick={handleClose}>
                <ListItemIcon>
                    <CiLogin/>
                </ListItemIcon>
                Logout
              
            </MenuItem>
          </Link>
        </List>
        }
      </Menu>
    </Fragment>
  );
}
