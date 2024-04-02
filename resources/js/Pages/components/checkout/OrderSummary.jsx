import { Box, Divider, Paper } from "@mui/material"

const OrderSummary = ({order_summary}) =>{
    return (
      <>
      <Paper>
        <Box pb={2}>
            <Box ml={2} py={2}>
              <p className='font-poppins font-bold text-lg'>Order Summary</p>  
            </Box>
            <Divider/>
            <Box ml={2}>
              <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mb={1}>
                <p className='opacity-60 font-opensans'>Discount</p>
                <p className='font-poppins text-sm mr-4'>{order_summary.discount}DH</p>  
              </Box>
              <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mb={1}>
                <p className='opacity-60 font-opensans'>Delivery</p>
                <p className='font-poppins text-sm mr-4'>{order_summary.delivary}DH</p>
              </Box>
              <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mb={1}>
                <p className='opacity-60 font-opensans'>Tax</p>
                <p className='font-poppins text-sm mr-4'>{order_summary.tax}DH</p>
              </Box>
              <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mb={1}>
                <p className='opacity-60 font-opensans'>Total</p>
                <p className='font-poppins font-semibold mr-4'>{order_summary.total}DH</p>
              </Box>
            </Box>
          
        </Box>
        </Paper>
      </>
    )
  }
  export default OrderSummary