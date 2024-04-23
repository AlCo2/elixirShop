import React, { useState } from 'react'
import { Box, Button, Container, Divider, Grid } from '@mui/material';
import Layout from '@/Layout';

const Product = ({title, total, image}) =>{
  return(
    <Box sx={{my:2, display:'flex', alignItems:'center', justifyContent:'space-between',gap:5}}>
      <Box sx={{display:'flex', alignItems:'center', gap:5}}>
        <Box sx={{maxWidth:50, maxHeight:50, borderRadius:50}}>
          <img className='rounded-md' src={image} alt={title} />
        </Box>
        <p className='opacity-70 text-sm font-Poppins'>{title}</p>
      </Box>
      <p className='font-Poppins text-sm font-bold'>{total}DH</p>
    </Box>
  )
}

const page = ({order, products}) => {
  const [date, setDate] = useState(new Date(order?order.created_at:''))
  return (
    <Container className='min-h-80'>
      {order?
        <>
        <Box>
          <p className='font-bold font-Poppins mt-5'>Your order from {date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()}</p>
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
            </Box>
          </Grid>
        </Grid>
        {products.map((product)=>(
          <Product key={product.product.id} title={product.product.title} total={product.total} image={product.product.images[0].url}/>
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
        <Box sx={{display:'flex', justifyContent:'center', alignItems:'center',my:5}}>
        <p className='opacity-70 text-sm font-Poppins max-w-md'>
            Feel free to contact us if you have any questions or comments! We are happy to help. Contact us via <a className='text-blue-600' href="">lilianashop@gmail.com</a>
          </p>
        </Box>
      </>
      :
      <Box sx={{display:'flex', flexDirection:'column',gap:4,justifyContent:'center', alignItems:'center',my:5, height:250}}>
        <p className='opacity-70 text-sm font-Poppins max-w-md'>
          there is no valid order with this id
        </p>
        <Button variant='contained' size='small' href='/checkorder' color='liliana_third'>Back</Button>
      </Box>
      }
    </Container>
  )
}
page.layout = page => <Layout children={page} tite="Checkorder" />
export default page;