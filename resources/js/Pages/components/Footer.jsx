import { Box, Button, Container, Grid } from '@mui/material';
import React from 'react'
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';
const Footer = () => {
  return (
    <div className='bg-liliana-primary text-white pt-2 font-Roboto'>
      <Container >
        <Grid container columns={13} justifyContent={'center'} gap={2}>
          <Grid xs={12} md={3} item>
            <p className='font-bold'>À propos de nous</p>
            <p className='text-sm'>LILIANA est une boutique en ligne permet aux clients de commander et/ou de payer des produits (Vêtements, Accessoires, Cosmétiques et … Pour Hommes, Femmes et Enfants). LILIANA est une plateforme de commerce électronique permettant aux commerçants de créer des affaires en ligne et de vendre des produits ou des services en ligne. Avec LILIANA vous pouvez personnalisé votre Shopping avec nos offres allant jusqu'à 70% de Réduction.</p>
          </Grid>
          <Grid xs={12} md={3} item>
            <p className='font-bold'>Contacter-nous</p>
            <Box>
              <p className='text-sm'>212 614 903 001</p>
              <p className='text-sm'>212 614 903 001</p>
              <p className='text-sm'>lilianashop381@gmail.com</p>
            </Box>
          </Grid>
          <Grid xs={12} md={3} item>
            <p className='mb-2 font-bold'>RETROUVEZ-NOUS SUR</p>
            <Box display={'flex'} gap={5}>
              <FaFacebook className='cursor-pointer hover:text-liliana-third'/>
              <FaInstagram className='cursor-pointer hover:text-liliana-third'/>
              <FaTiktok className='cursor-pointer hover:text-liliana-third'/>
              <FaWhatsapp className='cursor-pointer hover:text-liliana-third'/>
            </Box>
          </Grid>
          <Grid xs={12} md={3} item>
            <p className='font-bold'>NOUVEAU SUR Liliana ?</p>
            <p className='text-sm'>Inscrivez-vous à nos communications pour recevoir nos meilleures offres!</p>
            <input type="text" className='outline-none text-black text-sm h-7 rounded-sm px-1 max-w-40 my-2' placeholder='name@gmail.com' name="" id="" />
            <Button variant='contained' sx={{width:90, ml:1}} color='liliana_third' className='h-7 text-xs'>Subscribe</Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Footer;