import { Box, Button, Card, CardContent, CardMedia, Grid, ThemeProvider, Typography, createTheme } from '@mui/material';
import React from 'react'
import { FaShoppingBasket } from 'react-icons/fa';
import { theme } from '@/theme';

const SuggestionCard = ({title, image, price}) => {
  return (
    <Grid item >
      <Card sx={{width:200, ":hover":{boxShadow:5}, cursor:'pointer'}}>
        <Box display={'flex'} justifyContent={'center'}>
          <CardMedia component={'img'}
            sx={{height:150, width:150, borderRadius:5}}
            image={image}
            alt={title}
          />
        </Box>
        <Box display={'flex'} height={70} justifyContent={'center'}>
          <CardContent>
            <Typography textAlign={'center'} variant="body1">
              {title}
            </Typography>
          </CardContent>
        </Box>
        <Box display={'flex'} margin={2} justifyContent={'space-between'} alignItems={'center'}>
          <Typography fontFamily={'Poppins'} variant="body2">{price}.00DH</Typography>
          <ThemeProvider theme={theme}>
            <Button href='/store/product' variant="contained" color='liliana_secondary' className="bg-liliana-secondary hover:bg-violet-600"><FaShoppingBasket/></Button>
          </ThemeProvider>
        </Box>
      </Card>
    </Grid>
  )
}

export default SuggestionCard;