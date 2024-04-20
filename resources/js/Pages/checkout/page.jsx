import { useEffect, useState } from "react";
import OrderSummary from "./components/OrderSummary";
import Order from "./components/Order";
import { Box, Button, Container, Divider, Grid, Paper } from "@mui/material";
import { router } from "@inertiajs/react";
import Layout from "@/Layout";


const page = ({data}) => {
  const [order_summary, setOrder_summary] = useState({
    discount:0.00,
    delivary:0.00,
    tax:0.00,
    total:0.00,
  })
  useEffect(()=>{
    let total = 0;
    data.map((product)=>(
      total += product.product.price * product.Q
    ))
    setOrder_summary({...order_summary, total:total.toFixed(2)})
  }, [data])
  return (
  <>
    <div className="min-h-80 pt-5 bg-liliana-background">
      <Container>
        <Grid container gap={4} justifyContent={'center'} columns={12}>
          <Grid item xs={12} md={9}>
            <Paper className="overflow-auto">
              <div className='ml-8 py-4'>
                <p className='font-poppins font-bold text-xl'>Shopping Cart</p>
              </div>
              <Divider/>
              <div className='ml-8 mt-4'>
                {data.length>0?
                <table className='w-11/12'>
                  <thead className='h-10'>
                    <tr>
                      <th className='font-opensans text-start text-sm opacity-80'>Product</th>
                      <th className='font-opensans text-sm opacity-80'>Quantity</th>
                      <th className='font-opensans text-center text-sm opacity-80'>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((product)=>(
                      <Order key={product.product.id} image={'/images/' + product.product.image} id={product.product.id} name={product.product.title} price={product.product.price * product.Q} Q={product.Q}/>
                    ))}
                  </tbody>
                </table>
                :
                <div className="text-center">
                  <p className="font-Poppins text-xl mb-5">Your shopping cart is empty!</p>
                  <Button href="/store" variant="text" color="liliana_third">Buy Something</Button>
                </div>
                }
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} md={2.5}>
            <OrderSummary order_summary={order_summary}/>
            <Box sx={{display:'flex', justifyContent:'center', mt:2}}>
              <Button variant='contained' href="/checkout/fastcheckout" color="liliana_third">Continue</Button>
            </Box>
          </Grid>
        </Grid>
        <Box py={4}>
          <Button href='/' variant='outlined' color="liliana_third" className='font-Roboto'>Back</Button>
        </Box>
      </Container>
    </div>
    </>
  )
}

page.layout = page => <Layout children={page} tite="checkout" />
export default page;