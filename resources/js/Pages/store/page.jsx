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
import FilterPrice from './components/FilterPrice';
import SortMenu from './components/SortMenu';
import FilterMenu from './components/FilterMenu';


const store = ({products, category_list, filter, sort, filteredprice, maxPrice, type}) => {  
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
      <div className='min-h-screen max-sm:px-4'>
        {type?
          type=='man'?
          <div className='h-52 bg-center bg-cover flex justify-center items-center' style={{backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/assets/imad.png')", backgroundPosition:'0px 520px'}}>
            <p className='text-white font-Italiana text-6xl'>Man Perfume</p>
          </div>
          :
          <div className='h-52 bg-center bg-cover flex justify-center items-center' style={{backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://a1.eestatic.com/cronicaglobal/2015/01/18/culemania/cule-bron/cule-bron_4260386_2174029_1706x960.jpg')", backgroundPosition:'0px 550px'}}>
            <p className='text-white font-Italiana text-6xl'>Woman Perfume</p>
          </div>
        :
        <div className='h-52 bg-center bg-cover flex justify-center items-center' style={{backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://www.jeanpaulgaultier.com/fr/sites/fr/files/styles/scale_1920/public/2024-03/header-plp-parfums-pour-hommes.jpg?itok=0FzBo0aU')"}}>
          <p className='text-white font-Italiana text-6xl'>Morocco Perfume Boutique</p>
        </div>
        }
          <Grid container columns={12} justifyContent={'center'}>
            <Grid xs={2.5} item sx={{p:"1.25rem", pb:'0.25rem', pt:'1.9rem'}} className='max-lg:hidden '>
              <p className='font-bold font-Opensans text-xl'>Filters</p>
              <p className='font-Opensans font-semibold mt-5'>Price</p>
              <FilterPrice price={price} maxPrice={maxPrice} setPrice={setPrice} setPriceFilterActive={setPriceFilterActive} priceFilterActive={priceFilterActive}/>

              {!type && <p className='font-Opensans font-semibold mt-5'>Categories</p>}
              {!type && category_list.length > 0 &&
              <FormControlLabel control={<Checkbox color='liliana_third' size='small' onChange={handleSelectAllChange}/>} label="All" />
              }
              <FormGroup className='pl-2 font-Opensans'>
                {!type && category_list.map(category=>(
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
                        <FilterMenu category_list={category_list} categories={categories} handleCheckboxChange={handleCheckboxChange} handleSelectAllChange={handleSelectAllChange} price={price} setPrice={setPrice} setPriceFilterActive={setPriceFilterActive} priceFilterActive={priceFilterActive} maxPrice={maxPrice}/>
                      </div>
                      <p className='text-sm'>Sort</p>
                      <SortMenu selectedSort={selectedSort} setselectedSort={setselectedSort}/>
                    </Box>
                  </Grid>
                </Grid>
              <Grid container gap={1} marginY={5} justifyContent={{xs:'center'}} mt={2}>
                { products.data.length>0?products.data.map((product)=>(
                  <SuggestionCard key={product.id} product={product}/>
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