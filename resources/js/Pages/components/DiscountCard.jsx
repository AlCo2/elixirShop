import { Box, Button, Card, CardContent, CardMedia, Grid, Typography} from '@mui/material';
import React from 'react'
import { FaShoppingBasket } from 'react-icons/fa';
const DiscountCard = ({title, image, price, discountPrice}) => {
  return (
    <Grid item >
      <Card sx={{width:240, ":hover":{boxShadow:5}, cursor:'pointer'}}>
        <Box mr={1}>
            <p className='font-Poppins text-red-500 text-right'>{'-'+parseInt(((price - discountPrice) / (price)) * 100)+'%'}</p>
        </Box>
        <Box display={'flex'} justifyContent={'center'}>
          <CardMedia component={'img'}
            sx={{height:200, width:200, borderRadius:5}}
            image={image}
            alt={title}
          />
        </Box>
        <Box display={'flex'} height={70} justifyContent={'center'}>
          <CardContent>              
            <Typography textAlign={'center'} variant="h6">
              {title}
            </Typography>
          </CardContent>
        </Box>
        <Box display={'flex'} mr={2} justifyContent={'space-between'} alignItems={'center'}>
            <Box>
                <p className='line-through font-Poppins text-sm pl-2'>{price}.00DH</p>
                <div className='bg-liliana-primary rounded-tr-md'>
                    <p className='font-Poppins p-2 text-white font-bold'>{discountPrice}.00DH</p>
                </div>
            </Box>
          <Button variant="contained" color='liliana_secondary'><FaShoppingBasket/></Button>
        </Box>
      </Card>
    </Grid>
  )
}

export default DiscountCard;