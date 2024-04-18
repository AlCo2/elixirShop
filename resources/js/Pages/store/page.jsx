import { Box, List, Button, Checkbox, Container, FormControlLabel, FormGroup, Grid, IconButton, Menu, MenuItem, Paper } from '@mui/material';
import { useState } from 'react';
import { CgSortAz } from "react-icons/cg";
import SuggestionCard from './components/SuggestionCard';
import { BiSearch } from 'react-icons/bi';
import { RiArrowUpDownFill } from 'react-icons/ri';

const SortMenu = () =>{
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
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
    setSelectedIndex(index);
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
        sx={{ bgcolor: 'background.paper' }}
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
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

const CategoryMenu = () =>{
  const [categories, setCategories] = useState([
    {id:1,name:'Brum', status:false},
    {id:2,name:'Corps et bain', status:false},
    {id:3,name:'Packs', status:false},
    {id:4,name:'Parfum', status:false},
    {id:5,name:'Maquillage', status:false},
    {id:6,name:'Soin de visage', status:false},
  ])
  const [selectAll, setSelectAll] = useState(false);
  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    setCategories(categories.map(category => ({ ...category, status: checked })));
  };

  const handleCheckboxChange = (id) => (e) => {
    setCategories(prevCategories =>
      prevCategories.map(category =>
        category.id === id ? { ...category, status: e.target.checked } : category
      )
    );
  };
  return (
        <List
          id="basic-menu"
        >
          <FormControlLabel className='pl-2' control={<Checkbox onChange={handleSelectAllChange}/>} label="All" />
          <FormGroup className='pl-5'>
            {categories.map(category=>(
              <FormControlLabel key={category.id} control={<Checkbox checked={category.status} size='small' onChange={handleCheckboxChange(category.id)} />} label={category.name} />  
            ))}
          </FormGroup>
        </List>
  )
}

const FilterMenu = () =>{
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
                  <input type="text" placeholder='Search' className='border h-8 focus:outline-blue-400 p-1 text-sm w-full' name="" id="" />
                </label>
              </Grid>
              <Grid item xs={12}>
                <p className='font-Poppins'>Categories</p>
              </Grid>
              <Grid item xs={12}>
                <CategoryMenu/>
              </Grid>
            </Grid>
          </Container>
        </div>
      </Menu>
    </div>
  );
}

const store = ({products}) => {
  const [categories, setCategories] = useState([
    {id:1,name:'Brum', status:false},
    {id:2,name:'Corps et bain', status:false},
    {id:3,name:'Packs', status:false},
    {id:4,name:'Parfum', status:false},
    {id:5,name:'Maquillage', status:false},
    {id:6,name:'Soin de visage', status:false},
  ])
  const [selectAll, setSelectAll] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    setCategories(categories.map(category => ({ ...category, status: checked })));
  };

  const handleCheckboxChange = (id) => (e) => {
    setCategories(prevCategories =>
      prevCategories.map(category =>
        category.id === id ? { ...category, status: e.target.checked } : category
      )
    );
  };

  return (
    <>
      <div className='min-h-screen pt-5 bg-liliana-background'>
        <Container>
          <Grid container columns={12} justifyContent={'center'} gap={2}>
            <Grid xs={2} item className='max-xl:hidden'>
              <Paper className='p-5 rounded-md'>
                <p className='font-bold'>categories</p>
                <FormControlLabel control={<Checkbox onChange={handleSelectAllChange}/>} label="All" />
                <FormGroup className='pl-5'>
                  {categories.map(category=>(
                    <FormControlLabel key={category.id} control={<Checkbox checked={category.status} size='small' onChange={handleCheckboxChange(category.id)} />} label={category.name} />  
                  ))}
                </FormGroup>
              </Paper>
            </Grid>
            <Grid md={9} item>
              <Paper className='p-5 pb-1 rounded-md'>
                <Grid container alignItems={'center'} justifyContent={'space-between'}>
                  <Grid item>
                    <p className='font-bold text-sm opacity-70'>23 Items</p>
                  </Grid>
                  <Grid item display={'flex'} alignItems={'center'} gap={2}>
                    <Box display={'flex'} alignItems={'center'}>
                      <p className='text-sm'>Filter</p>
                      <FilterMenu/>
                      <p className='text-sm'>Sort</p>
                      <SortMenu/>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
              <Grid container gap={1} marginY={5} justifyContent={{xs:'center'}} mt={2}>
                { products.map((product)=>(
                  <SuggestionCard key={product.id} id={product.id} title={product.title} image={'images/'+product.image} price={product.price}/>
                ))
                }
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  )
}

export default store;