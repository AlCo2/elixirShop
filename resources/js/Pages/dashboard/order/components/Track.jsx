import { router } from '@inertiajs/react';
import { Button, IconButton } from '@mui/material';
import { useState } from 'react';
import { FaEye } from 'react-icons/fa';

const today_date = new Date().toISOString().split('T')[0];
const Track = ({total}) => {
  const [values, setValues] = useState({
    total:total,
    date: today_date,
  });
  const handleChange = (e) =>{
    const { id, value } = e.target;
    if (values.date==today_date && id=='total')
    {
      setValues(prevValues => ({
        ...prevValues,
        [id]: total,
      }));
    }
    else
    {
      setValues(prevValues => ({
        ...prevValues,
        [id]: value,
      }));
      if (value == today_date)
        values.total = total;
    }
  }
  const handleSubmit = ()=>{
    values.total = parseInt(values.total);
    router.post("/orders/track", values);
  }
  return (
    <div className='flex flex-col gap-2'>
      <p className='font-Poppins font-semibold mb-2'>Track Orders</p>
      <div>
        <div className='flex'>
            <input id='total' onChange={handleChange} type="number" value={values.total} className='w-20' />
            <input id='date' onChange={handleChange} type="date" value={values.date} max={today_date}/>
        </div>
        <div className='flex justify-end my-2'>
            <Button onClick={handleSubmit} variant='contained' size='small' color='dashboard_primary' sx={{textTransform:'none'}}>Track</Button>
        </div>
      </div>
    </div>
  )
}

export default Track;