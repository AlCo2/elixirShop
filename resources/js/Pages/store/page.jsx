import { Box, List, Button, Checkbox, Container, FormControlLabel, FormGroup, Grid, IconButton, Menu, MenuItem, Paper, Pagination, PaginationItem, Slider, FormControl, TextField, InputAdornment } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { CgSortAz } from "react-icons/cg";
import SuggestionCard from './components/SuggestionCard';
import { BiSearch } from 'react-icons/bi';
import { RiArrowUpDownFill } from 'react-icons/ri';
import Layout from '@/Layout';
import { Link, router } from '@inertiajs/react';
import { FaCheckCircle } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';

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
            selected={index === selectedSort}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

const CategoryMenu = ({category_list, categories, handleSelectAllChange, handleCheckboxChange}) =>{
  return (
        <List
          id="basic-menu"
        >
          <FormControlLabel className='pl-2' control={<Checkbox onChange={handleSelectAllChange}/>} label="All" />
          <FormGroup className='pl-5'>
                {category_list.map(category=>(
                    <FormControlLabel key={category.id} control={<Checkbox checked={categories.includes(category.id)} size='small' onChange={handleCheckboxChange(category.id)} />} label={category.name} />  
                ))}
          </FormGroup>
        </List>
  )
}

const FilterMenu = ({category_list, categories, handleSelectAllChange, handleCheckboxChange, price, setPrice, setPriceFilterActive, priceFilterActive}) =>{
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
                <p className='font-Poppins'>price</p>
                <FilterPrice price={price} setPrice={setPrice} setPriceFilterActive={setPriceFilterActive} priceFilterActive={priceFilterActive}/>
              </Grid>
              <Grid item xs={12}>
                <p className='font-Poppins'>Categories</p>
              </Grid>
              <Grid item xs={12}>
                <CategoryMenu category_list={category_list} categories={categories} handleSelectAllChange={handleSelectAllChange} handleCheckboxChange={handleCheckboxChange}/>
              </Grid>
            </Grid>
          </Container>
        </div>
      </Menu>
    </div>
  );
}

const FilterPrice = ({price, setPrice, setPriceFilterActive, priceFilterActive}) =>{
  const [value1, setValue1] = useState([price[0], price[1]]);
  function valuetext(value) {
    return `${value}`;
  }
  const minDistance = 50;

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };
  function handleSubmite(e)
  {
    setPrice([value1[0], value1[1]]);
    setPriceFilterActive(true);
  }
  return (
    <>
        <Slider
          getAriaLabel={() => 'Minimum distance'}
          color='liliana_third'
          value={value1}
          onChange={handleChange1}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          disableSwap
          min={10}
          max={1000}
        />
        <div className='flex flex-wrap gap-1'>
          <FormControl fullWidth sx={{width:85}}>
            <TextField
              id="min"
              sx={{bgcolor:'white'}}
              InputProps={{
                startAdornment: <InputAdornment position="start">DH</InputAdornment>,
                style:{fontSize:'12px'}
              }}
              size='small'
              value={value1[0]}
            />
          </FormControl>
          -
          <FormControl fullWidth sx={{width:85}}>
            <TextField
              id="max"
              sx={{bgcolor:'white'}}
              InputProps={{
                startAdornment: <InputAdornment position="start">DH</InputAdornment>,
                style:{fontSize:'12px'}
              }}
              size='small'
              value={value1[1]}
            />
          </FormControl>
          <IconButton onClick={handleSubmite} size='small'>
            <FaCheckCircle className='text-green-600'/>
          </IconButton>
          {priceFilterActive &&
          <IconButton onClick={()=>setPriceFilterActive(false)} size='small'>
            <FaXmark className='text-red-600'/>
          </IconButton>
          }
        </div>
      </>
  )
}

const store = ({products, category_list, filter, sort, filteredprice}) => {  
  const [page, setPage] = useState(products.current_page);
  const [price, setPrice] = useState([filteredprice.min, filteredprice.max]);
  const [priceFilterActive, setPriceFilterActive] = useState(filteredprice.active);
  const convertedData = filter.map(item => Number(item));
  const [categories, setCategories] = useState(convertedData);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedSort, setselectedSort] = useState(Number(sort));
  const [anchorEl, setAnchorEl] = useState(null);
  const isFirstRender = useRef(true);
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
    if (categories.length>0){
      setCategories([]);
    }
    else
    {
      setCategories(category_list.map(category => category.id))
    }
  };

  const handleCheckboxChange = (id) => (e) => {
    if(categories.includes(id))
    {
      setCategories(categories.filter(category_id=> category_id !== id));
    }
    else
    {
      setCategories(categories => [...categories, id]);
    }
  };

  const handlePageChange = (e, value) =>{
    setPage(value);
  }
  useEffect(()=>{
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    let price_filter = [null, null];
    if (priceFilterActive)
      price_filter = price;
    if(selectedSort>0)
      router.get('/store', { filter:categories, sort: selectedSort, min: price_filter[0], max:price_filter[1]});
    else
      router.get('/store', { filter:categories, min: price_filter[0], max:price_filter[1]});
  }, [categories, selectedSort, price, priceFilterActive])
  
  return (
    <>
      <div className='min-h-screen pt-5 bg-liliana-background max-sm:px-4'>
          <Grid container columns={12} justifyContent={'center'}>
            <Grid xs={2.5} item sx={{p:"1.25rem", pb:'0.25rem', pt:'1.9rem'}} className='max-lg:hidden '>
              <p className='font-bold font-Opensans text-xl'>Filters</p>
              <p className='font-Opensans font-semibold mt-5'>Price</p>
              <FilterPrice price={price} setPrice={setPrice} setPriceFilterActive={setPriceFilterActive} priceFilterActive={priceFilterActive}/>
              <p className='font-Opensans font-semibold mt-5'>Categories</p>
              {category_list.length > 0 &&
              <FormControlLabel control={<Checkbox color='liliana_third' size='small' onChange={handleSelectAllChange}/>} label="All" />
              }
              <FormGroup className='pl-2 font-Opensans'>
                {category_list.map(category=>(
                    <FormControlLabel key={category.id} control={<Checkbox color='liliana_third' checked={categories.includes(category.id)} size='small' onChange={handleCheckboxChange(category.id)} />} label={category.name} />  
                  ))}
              </FormGroup>
            </Grid>
            <Grid md={9.5} sx={{p:"1.25rem", pb:'0.25rem'}} item>
                <Grid container alignItems={'center'} justifyContent={'space-between'}>
                  <Grid item>
                    <p className='font-bold text-sm opacity-70'>{products.total} Items</p>
                  </Grid>
                  <Grid item display={'flex'} alignItems={'center'} gap={2}>
                    <Box display={'flex'} alignItems={'center'}>
                      <div className='flex items-center lg:hidden'>
                        <p className='text-sm'>Filters</p>
                        <FilterMenu category_list={category_list} categories={categories} handleCheckboxChange={handleCheckboxChange} handleSelectAllChange={handleSelectAllChange} price={price} setPrice={setPrice} setPriceFilterActive={setPriceFilterActive} priceFilterActive={priceFilterActive}/>
                      </div>
                      <p className='text-sm'>Sort</p>
                      <SortMenu selectedSort={selectedSort} setselectedSort={setselectedSort}/>
                    </Box>
                  </Grid>
                </Grid>
              <Grid container gap={2} marginY={5} justifyContent={{xs:'center'}} mt={2}>
                { products.data.length>0?products.data.map((product)=>(
                  <SuggestionCard key={product.id} id={product.id} title={product.title} image={product.images[0].url} price={product.price}/>
                ))
                :
                <p>There is no product to Show</p>
                }
              </Grid>
            </Grid>
          </Grid>
          {products.data.length>0 &&
          <Box sx={{display:'flex', justifyContent:'center'}}>
            <Pagination onChange={handlePageChange}
              renderItem={(item) =>(
              <PaginationItem
                component={Link}
                href={categories.length>0?window.location.href +'&page='+item.page:'/store?page='+item.page +(selectedSort>0?'&sort='+selectedSort:'')+(priceFilterActive?'&min='+price[0]+'&max='+price[1]:'')}
                {...item}
              />
            )} 
            count={products.last_page}
            page={page} 
            sx={{py:5}}/>
          </Box>
          }
      </div>
    </>
  )
}

store.layout = page => <Layout children={page} title="Store" />
export default store;