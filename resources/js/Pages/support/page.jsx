import Layout from '@/Layout';
import { router, usePage } from '@inertiajs/react';
import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'

const page = () => {
  const { auth } = usePage().props;
  const [values, setValues] = useState({
    email: auth&&auth.user?auth.user.email:'',
    message:''
    }
  );
  const handleChange = (e) =>{
    const { id } = e.target;
    setValues(prevV=>({...prevV, [id]:e.target.value}))
  }
  const handleSubmit = () =>{
    if (values.email.length===0 || values.message.length===0)
      return;
    router.post('/message/create', values);
  }
  return (
    <div className='min-h-80 flex flex-col items-center gap-4'>
      <div className='sm:w-1/2 max-sm:w-4/5'>
        <TextField id='email' onChange={handleChange} value={values.email} fullWidth variant='standard' label={'Email'}/>
      </div>
      <div className='sm:w-1/2 max-sm:w-4/5'>
        <TextField id='message' onChange={handleChange} fullWidth variant='filled' label={"Message"} multiline={true} rows={4}/>
      </div>
      <div className='w-1/2 max-sm:w-4/5 flex justify-end'>
        <Button onClick={handleSubmit} variant='contained' color='liliana_dark'>Send</Button>
      </div>
    </div>
  )
}

page.layout = page => <Layout children={page} tite="checkout" />
export default page;