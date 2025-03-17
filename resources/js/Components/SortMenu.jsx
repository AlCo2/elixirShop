import { IconButton, List, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { RiArrowUpDownFill } from "react-icons/ri";

const SortMenu = ({selectedSort, setselectedSort}) =>{
    const [anchorEl, setAnchorEl] = useState(null);
    const options = [
      'Best Match',
      'Price Low - High',
      'Price High - Low',
      'Newest',
    ];
    const open = Boolean(anchorEl);
    const handleClickListItem = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuItemClick = (event, index) => {
      setselectedSort(index);
      setAnchorEl(null);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
      <div>
        <List
          component="nav"
          aria-label="Device settings"
        >
          <IconButton
            id="lock-button"
            aria-haspopup="listbox"
            aria-controls="lock-menu"
            aria-label="when device is locked"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClickListItem}
          >
            <RiArrowUpDownFill className='text-sm'/>
          </IconButton>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'lock-button',
            role: 'listbox',
          }}
        >
          {options.map((option, index) => (
            <MenuItem
              key={option}
              selected={index == selectedSort}
              onClick={(event) => handleMenuItemClick(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
  

export default SortMenu