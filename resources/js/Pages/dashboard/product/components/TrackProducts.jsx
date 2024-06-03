import { router } from '@inertiajs/react';
import { Button, IconButton } from '@mui/material';
import { useState } from 'react';
import { FaEye } from 'react-icons/fa';

const today_date = new Date().toISOString().split('T')[0];
const TrackProducts = ({total_products}) => {
  const [values, setValues] = useState({
    total_products:total_products,
    date: today_date,
  });
  const handleChange = (e) =>{
    const { id, value } = e.target;
    if (values.date==today_date && id=='total_products')
    {
      setValues(prevValues => ({
        ...prevValues,
        [id]: total_products,
      }));
    }
    else
    {
      setValues(prevValues => ({
        ...prevValues,
        [id]: value,
      }));
      if (value == today_date)
        values.total_products = total_products;
    }
  }
  const handleSubmit = ()=>{
    values.total_products = parseInt(values.total_products);
    router.post("/products/track", values);
  }
  return (
    <div className='flex flex-col gap-2'>
      <p className='font-Poppins font-semibold mb-2'>Track Products</p>
      <div>
        <div className='flex'>
            <input id='total_products' onChange={handleChange} type="number" value={values.total_products} className='w-20' />
            <input id='date' onChange={handleChange} type="date" value={values.date} max={today_date}/>
        </div>
        <div className='flex justify-end my-2'>
            <Button onClick={handleSubmit} variant='contained' size='small' color='dashboard_primary' sx={{textTransform:'none'}}>Track</Button>
        </div>
      </div>
    </div>
  )
}

export default TrackProducts;