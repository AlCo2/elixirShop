import { Box, Button, Container, Grid } from '@mui/material';
import { CiMail } from 'react-icons/ci';
import { FaAngleRight, FaFacebook, FaInstagram, FaMap, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import { FaPhoneFlip } from 'react-icons/fa6';
const Footer = () => {
  return (
    <div className='bg-liliana-primary text-white pt-2 font-Roboto'>
      <Container>
        <Grid container columns={13} justifyContent={'center'} gap={2}>
          <Grid xs md={3} item>
            <p className='font-bold text-lg'>A PROPOS</p>
            <ul className='ml-1 text-sm'>
              <li className='flex w-fit items-center hover:translate-x-1 cursor-pointer duration-300'><FaAngleRight/> Nous contacter</li>
              <li className='flex w-fit items-center hover:translate-x-1 cursor-pointer duration-300'><FaAngleRight/> Qui sommes-nous ?</li>
            </ul>
          </Grid>
          <Grid xs md={3} item>
            <p className='font-bold text-lg'>NOS SERVICES</p>
            <ul className='ml-1 text-sm'>
              <li className='flex w-fit items-center hover:translate-x-1 cursor-pointer duration-300'><FaAngleRight/> Paiements</li>
              <li className='flex w-fit items-center hover:translate-x-1 cursor-pointer duration-300'><FaAngleRight/> Livraisons</li>
            </ul>
          </Grid>
          <Grid xs md={3} item>
            <p className='font-bold text-lg'>INFORMATIONS</p>
            <ul className='ml-1 text-sm'>
              <li className='flex w-fit items-center hover:translate-x-1 cursor-pointer duration-300'><FaAngleRight/> Blog</li>
              <li className='flex w-fit items-center hover:translate-x-1 cursor-pointer duration-300'><FaAngleRight/> Livraisons</li>
              <li className='flex w-fit items-center hover:translate-x-1 cursor-pointer duration-300'><FaAngleRight/> Sécurité & confidentialité</li>
              <li className='flex w-fit items-center hover:translate-x-1 cursor-pointer duration-300'><FaAngleRight/> Conditions de vente</li>
            </ul>
          </Grid>
          <Grid xs md={3} item>
            <p className='font-bold text-lg'>CONTACTER-NOUS</p>
            <ul className='ml-1'>
              <li className='flex w-fit items-center gap-2'><FaMap/><a href="">Nous trouver</a></li>
              <li className='flex w-fit items-center gap-2'><FaPhoneFlip/><a href="">+212 614 903 001</a></li>
              <li className='flex w-fit items-center gap-2'><CiMail/><a href="">lilianashop381@gmail.com</a></li>
            </ul>
          </Grid>
        </Grid>
        <Box sx={{display:'flex', justifyContent:'space-between', py:2, flexWrap:'wrap', gap:2}}>
          <Box>
            <Box sx={{display:'flex', gap:'5px'}}>
              <div className='bg-liliana-third rounded-sm hover:bg-opacity-70 p-2 cursor-pointer duration-300 text-xl'><FaFacebook/></div>
              <div className='bg-liliana-third rounded-sm hover:bg-opacity-70 p-2 cursor-pointer duration-300 text-xl'><FaInstagram/></div>
              <div className='bg-liliana-third rounded-sm hover:bg-opacity-70 p-2 cursor-pointer duration-300 text-xl'><FaTiktok/></div>
              <div className='bg-liliana-third rounded-sm hover:bg-opacity-70 p-2 cursor-pointer duration-300 text-xl'><FaWhatsapp/></div>
            </Box>
          </Box>
          <Box>
            <p className='font-bold'>NOUVEAU SUR Liliana ?</p>
            <p className='text-sm'>Inscrivez-vous à nos communications pour recevoir nos meilleures offres!</p>
            <input type="text" className='outline-none text-black text-sm h-7 rounded-sm px-1 max-w-40 my-2' placeholder='name@gmail.com' name="" id="" />
            <Button variant='contained' sx={{width:90, ml:1}} color='liliana_third' className='h-7 text-xs'>Subscribe</Button>
          </Box>
        </Box>
      </Container>
    </div>
  )
}

export default Footer;