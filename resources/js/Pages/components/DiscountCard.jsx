import { Link } from '@inertiajs/react';
import { Box, Button, Card, CardContent, CardMedia, Grid, Typography} from '@mui/material';
import React from 'react'
import { FaShoppingBasket } from 'react-icons/fa';

const DiscountCard = ({id, title, image, price, discountPrice}) => {
  return (
    <Grid item >
      <Card sx={{width:240, ":hover":{boxShadow:5}, cursor:'pointer', position:'relative'}}>
        <Box>
            <p className='absolute right-1 top-1 text-white font-Poppins bg-liliana-primary text-right px-2 py-1 rounded-lg'>{'-'+parseInt(((price - discountPrice) / (price)) * 100)+'%'}</p>
        </Box>
        <Link href={'/store/product/'+id}>
          <Box display={'flex'} justifyContent={'center'}>
              <CardMedia component={'img'}
                sx={{height:180, width:'100%'}}
                image={image}
                alt={title}
              />
          </Box>
        </Link>
        <Box display={'flex'} height={70} justifyContent={'center'}>
          <CardContent>
            <p className='text-center font-bold'>{title}</p>
          </CardContent>
        </Box>
        <Box display={'flex'} mr={2} justifyContent={'space-between'} alignItems={'center'}>
            <Box>
                <p className='line-through font-Poppins text-sm pl-2'>{price}.00DH</p>
                <div className='bg-liliana-primary rounded-tr-md'>
                    <p className='font-Poppins p-2 text-white font-bold'>{discountPrice}.00DH</p>
                </div>
            </Box>
          <Button href={'/store/product/'+id} variant="contained" color='liliana_third'><FaShoppingBasket/></Button>
        </Box>
      </Card>
    </Grid>
  )
}

export default DiscountCard;