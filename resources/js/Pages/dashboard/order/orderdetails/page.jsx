import React, { useState } from 'react'
import { Box, Button, Chip, Container, Divider, Grid } from '@mui/material';
import DashboardLayout from '../../DashboardLayout';
import ConfirmDeleteOrder from '../components/ConfirmDeleteOrder';
import OrderModelComponent from '../components/OrderModelComponent';

const Product = ({title, total, image, Q}) =>{
  return(
    <Box sx={{my:2, display:'flex', alignItems:'center', justifyContent:'space-between',gap:5}}>
      <Box sx={{display:'flex', alignItems:'center', gap:5}}>
        <Box sx={{maxWidth:50, maxHeight:50, borderRadius:50}}>
          <img className='rounded-md' src={image} alt={title} />
        </Box>
        <p className='opacity-70 text-sm font-Poppins'>{title}</p>
      </Box>
      <p className='font-Poppins text-sm font-bold opacity-70'>{Q}x{total}DH</p>
    </Box>
  )
}

const StatusComponent = ({status}) =>{
  switch (status)
  {
    case 1:
      {
        return (
          <Chip size='medium' color='warning' label='Pending'/>
        )
      }
    case 2:
      {
        return (
          <Chip size='medium' color='success' label='Completed'/>
        )
      }
      break;
    case 3:
      {
        return (
          <Chip size='medium' color='error' label='Declined'/>
        )
      }
      break;
  }
}

const page = ({order, products}) => {
  const [date, setDate] = useState(new Date(order?order.created_at:''))
  return (
    <Container className='min-h-80'>
      {order?
        <>
        <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center', mt:2}}>
          <div>
            <p className='font-bold font-Poppins mt-5'>{date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()}</p>
          </div>
          <div className='flex items-center'>
            <OrderModelComponent order={order} />
            <ConfirmDeleteOrder row={order}/>
          </div>
        </Box>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <p className='font-bold text-sm font-Poppins mt-5'>Order number</p>
            <Box sx={{mt:1}}>
              <p className='opacity-70 text-sm font-Poppins'>{order.id}</p>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <p className='font-bold text-sm font-Poppins mt-5'>Payment Option</p>
            <Box sx={{mt:1}}>
              <p className='opacity-70 text-sm font-Poppins'>On delivery</p>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <p className='font-bold text-sm font-Poppins mt-5'>Delivery address</p>
            <Box sx={{mt:1}}>
              <p className='opacity-70 text-sm font-Poppins'>{order.order_detail.country}, {order.order_detail.city}</p>
              <p className='opacity-70 text-sm font-Poppins'>{order.order_detail.address}</p>
              <p className='opacity-70 text-sm font-Poppins'>{order.order_detail.zip}</p>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <p className='font-bold text-sm font-Poppins mt-5'>Customer Info</p>
            <Box sx={{mt:1}}>
              <p className='opacity-70 text-sm font-Poppins'>{order.order_detail.firstname} {order.order_detail.lastname} </p>
              <p className='opacity-70 text-sm font-Poppins'>{order.order_detail.phone}</p>
            </Box>
          </Grid>
        </Grid>
        {products.map((product)=>(
          <Product key={product.product.id} title={product.product.title} total={product.total} image={product.product.images[0].url} Q={product.Q}/>
        ))}
        <Divider/>
        <Box sx={{display:'flex', justifyContent:'right', mt:1}}>
          <Box sx={{width:250,display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <p className='opacity-70 text-sm font-medium font-Poppins'>Subtotal</p>
            <p className='font-Poppins text-sm font-bold'>{order.total}DH</p>
          </Box>
        </Box>
        <Box sx={{display:'flex', justifyContent:'right', mt:1}}>
          <Box sx={{width:250,display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <p className='opacity-70 text-sm font-medium font-Poppins'>Shipping</p>
            <p className='font-Poppins text-sm font-bold'>Free</p>
          </Box>
        </Box>
        <Box sx={{display:'flex', justifyContent:'right', mt:1}}>
          <Box sx={{width:250,display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <p className='opacity-70 text-sm font-medium font-Poppins'>Total</p>
            <p className='font-Poppins text-sm font-bold'>{order.total}DH</p>
          </Box>
        </Box>
        <div className='flex justify-end my-5'>
          <StatusComponent status={order.status_id}/>
        </div>
      </>
      :
      <Box sx={{display:'flex', flexDirection:'column',gap:4,justifyContent:'center', alignItems:'center',my:5, height:250}}>
        <p className='opacity-70 text-sm font-Poppins max-w-md'>
          there is no valid order with this id
        </p>
      </Box>
      }
    </Container>
  )
}
page.layout = page => <DashboardLayout children={page} tite="Checkorder" />
export default page;