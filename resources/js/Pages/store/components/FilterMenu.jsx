import { Button, Container, Grid, IconButton, Menu } from "@mui/material";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import FilterPrice from "./FilterPrice";
import { CgSortAz } from "react-icons/cg";


const FilterMenu = ({price, setPrice, setPriceFilterActive, priceFilterActive, maxPrice}) =>{
    const [anchorEl, setAnchorEl] = useState(null);
    const [title, setTitle] = useState('');
    const open = Boolean(anchorEl);
    
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleChange = (e) =>{
      setTitle(e.target.value);
    };

    return (
      <div>
        <IconButton
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        >
          <CgSortAz className='text-xl'/>
        </IconButton>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'lock-button',
            role: 'listbox',
          }}
        >
          <div className='w-52'>
            <Container>
              <Grid container>
                <Grid item xs={12} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                  <p className='font-Poppins'>Filters</p>
                  <Button variant='text' size='small' className='text-xs text-liliana-secondary'>Clear ALL</Button>
                </Grid>
                <Grid item xs={12} my={1}>
                  <label className='relative'>
                    <BiSearch className='absolute top-0 right-2'/>
                    <input value={title} onChange={handleChange} type="text" placeholder='Search...' className='h-8 p-1 text-sm w-full' name="title" id="title" />
                  </label>
                  <Button variant="contained">Search</Button>
                </Grid>
                <Grid item xs={12}>
                  <p className='font-Poppins'>price</p>
                  <FilterPrice price={price} setPrice={setPrice} setPriceFilterActive={setPriceFilterActive} priceFilterActive={priceFilterActive} maxPrice={maxPrice}/>
                </Grid>
              </Grid>
            </Container>
          </div>
        </Menu>
      </div>
    );
}
  
export default FilterMenu