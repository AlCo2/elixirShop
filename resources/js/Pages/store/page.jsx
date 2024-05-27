import { Box, Grid, Pagination, PaginationItem } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import SuggestionCard from './components/SuggestionCard';
import Layout from '@/Layout';
import { Link, router } from '@inertiajs/react';
import FilterPrice from './components/FilterPrice';
import SortMenu from './components/SortMenu';
import FilterMenu from './components/FilterMenu';


const store = ({products, category_list, maxPrice,type, favourites}) => {  
  const [page, setPage] = useState(products.current_page);
  const path = window.location.pathname;
  const windowUrl = window.location.search;
  const params = new URLSearchParams(windowUrl);
  const min = params.get('min') || 50;
  const max = params.get('max') || maxPrice;
  const [price, setPrice] = useState([min, max]);
  const [priceFilterActive, setPriceFilterActive] = useState(params.get('min') && params.get('max'));
  const [title, setTitle] = useState(params.get('title') || '');
  const [selectedSort, setselectedSort] = useState(params.get('sort') || 0);
  const isFirstRender = useRef(true);
  const handleChange = (e) =>{
    setTitle(e.target.value);
  };
  const handleSearch = (e) =>{
    let queryParams = {};
    if (title.length>0)
      queryParams.title = title;
    if (priceFilterActive)
    {
      queryParams.min = price[0];
      queryParams.max = price[1];
    }
    if(selectedSort>0)
      queryParams.sort = selectedSort; 
    router.get(path, queryParams);
  };
  const handlePageChange = (e, value) =>{
    setPage(value);
  }
  useEffect(()=>{
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    let queryParams = {};
    if (title.length>0)
      queryParams.title = title;
    if (priceFilterActive)
    {
      queryParams.min = price[0];
      queryParams.max = price[1];
    }
    if(selectedSort>0)
      queryParams.sort = selectedSort; 
    router.get(path, queryParams);
  }, [selectedSort, price, priceFilterActive])
  
  return (
    <>
      <div className='min-h-screen max-sm:px-4'>
        {type?
          type=='man'?
          <div className='h-52 bg-center bg-cover flex justify-center items-center' style={{backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/assets/imad.webp')", backgroundPosition:'0px 520px'}}>
            <p className='text-white font-Italiana text-6xl'>Man Perfume</p>
          </div>
          :
          <div className='h-52 bg-center bg-cover flex justify-center items-center' style={{backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/assets/carla.webp')", backgroundPosition:'0px 550px'}}>
            <p className='text-white font-Italiana text-6xl'>Woman Perfume</p>
          </div>
        :
        <div className='h-52 bg-center bg-cover flex justify-center items-center' style={{backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/assets/parfum.webp')"}}>
          <p className='text-white font-Italiana text-6xl'>Morocco Perfume Boutique</p>
        </div>
        }
          <Grid container columns={12} justifyContent={'center'}>
            <Grid xs={2.5} item sx={{p:"1.25rem", pb:'0.25rem', pt:'1.9rem'}} className='max-lg:hidden '>
              <p className='font-bold font-Opensans text-xl'>Filters</p>
              <input value={title} onChange={handleChange} type="text" placeholder='Search...' className='h-8 p-1 text-sm w-full' name="title" id="title" />
              <button onClick={handleSearch}>Search</button>
              <p className='font-Opensans font-semibold mt-5'>Price</p>
              <FilterPrice price={price} maxPrice={maxPrice} setPrice={setPrice} setPriceFilterActive={setPriceFilterActive} priceFilterActive={priceFilterActive}/>
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
                        <FilterMenu category_list={category_list} price={price} setPrice={setPrice} setPriceFilterActive={setPriceFilterActive} priceFilterActive={priceFilterActive} maxPrice={maxPrice}/>
                      </div>
                      <p className='text-sm'>Sort</p>
                      <SortMenu selectedSort={selectedSort} setselectedSort={setselectedSort}/>
                    </Box>
                  </Grid>
                </Grid>
              <Grid container gap={1} marginY={5} justifyContent={{xs:'center'}} mt={2}>
                { products.data.length>0?products.data.map((product)=>(
                  <SuggestionCard key={product.id} product={product} favourites={favourites}/>
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
                href={`${path}?page=`+item.page +(selectedSort>0?'&sort='+selectedSort:'')+(priceFilterActive?'&min='+price[0]+'&max='+price[1]:''+(title.length>0?'&title='+title:''))}
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