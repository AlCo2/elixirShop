'use client'
import { useState } from "react";
import OrderSummary from "./components/OrderSummary";
import Order from "./components/Order";
import { Container, Divider, Grid, Paper } from "@mui/material";
import Navbar from "../components/Navbar";

const Checkout = () => {
  const [track_Q, setTrack_Q] = useState(0);
  const [order_summary, setOrder_summary] = useState({
    discount:0.00,
    delivary:30.00,
    tax:0.00,
    total:550.00,
  })

  return (
  <>
    <Navbar page={'checkout'}/>
    <div className="min-h-screen pt-5 bg-liliana-background">
      <Container>
        <Grid container gap={4} justifyContent={'center'} columns={12}>
          <Grid item xs={12} md={9}>
            <Paper className="overflow-auto">
              <div className='ml-8 py-4'>
                <p className='font-poppins font-bold text-xl'>Shopping Cart</p>
              </div>
              <Divider/>
              <div className='ml-8 mt-4'>
                <table className='w-11/12'>
                  <thead className='h-10'>
                    <tr>
                      <th className='font-opensans text-start text-sm opacity-80'>Product</th>
                      <th className='font-opensans text-sm opacity-80'>Quantity</th>
                      <th className='font-opensans text-center text-sm opacity-80'>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <Order key={1} image={'/assets/amirataraboriginal.jpg'} id={1} name={"اميرة العرب ORIGINAL 100ML"} price={250} Q={1}/>
                    <Order key={2} image={'/assets/philos.jpg'} id={2} name={"PHILOS 100ML ORIGINAL"} price={300} Q={1}/>
                  </tbody>
                </table>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} md={2.5}>
            <OrderSummary order_summary={order_summary}/>
          </Grid>
        </Grid>
      </Container>
    </div>
    </>
  )
}

export default Checkout;