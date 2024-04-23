import { Box, Button, Card, CardContent, CardMedia, Grid, Typography} from '@mui/material';
import { FaShoppingBasket } from 'react-icons/fa';
const IntroCard = ({id, title, image, price}) => {
  return (
    <Grid item >
      <Card sx={{width:240, ":hover":{boxShadow:5}, cursor:'pointer'}}>
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
        <Box display={'flex'} margin={2} justifyContent={'space-between'} alignItems={'center'}>
          <Typography fontFamily={'Poppins'} variant="body2">{price}DH</Typography>
          <Button href={'/store/product/'+id} variant="contained" color='liliana_secondary'><FaShoppingBasket/></Button>
        </Box>
      </Card>
    </Grid>
  )
}

export default IntroCard;