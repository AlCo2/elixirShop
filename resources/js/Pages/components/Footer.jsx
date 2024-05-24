import { Box, Button, Container, Grid } from '@mui/material';
import { CiMail } from 'react-icons/ci';
import { FaAngleRight, FaFacebook, FaInstagram, FaMap, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import { FaPhoneFlip } from 'react-icons/fa6';
const Footer = () => {
  return (
    <div className='bg-black text-white py-10 font-Poppins min-h-80'>
        <div>
        <p className='font-bold text-4xl ml-4 mb-5'>Liliana</p>
        </div>
        <Grid container columns={13} paddingX={10} justifyContent={'center'} gap={3}>
          <Grid xs md={3} item>
            <p className='font-semibold text-lg mb-2'>Landing</p>
            <ul className='text-sm'>
              <li className='flex w-fit items-center hover:translate-x-1 cursor-pointer duration-300 text-sm'>Get Started</li>
              <li className='flex w-fit items-center hover:translate-x-1 cursor-pointer duration-300 text-sm'>Learn More</li>
            </ul>
          </Grid>
          <Grid xs md={3} item>
            <p className='font-semibold text-lg mb-2'>Recommend</p>
            <ul className='text-sm'>
              <li className='flex w-fit items-center hover:translate-x-1 cursor-pointer duration-300 text-sm'>Dior Sauvage</li>
              <li className='flex w-fit items-center hover:translate-x-1 cursor-pointer duration-300 text-sm'>Blue De Chanel</li>
              <li className='flex w-fit items-center hover:translate-x-1 cursor-pointer duration-300 text-sm'>Creed Aventus</li>
              <li className='flex w-fit items-center hover:translate-x-1 cursor-pointer duration-300 text-sm'>Versace Eros</li>
            </ul>
          </Grid>
          <Grid xs md={3} item>
            <p className='font-semibold text-lg mb-2'>Seasonal</p>
            <ul className='text-sm'>
              <li className='flex w-fit items-center hover:translate-x-1 cursor-pointer duration-300 text-sm'>Ysl Libre</li>
              <li className='flex w-fit items-center hover:translate-x-1 cursor-pointer duration-300 text-sm'>Montblanc Explorer</li>
              <li className='flex w-fit items-center hover:translate-x-1 cursor-pointer duration-300 text-sm'>Aerin Lilea Path</li>
              <li className='flex w-fit items-center hover:translate-x-1 cursor-pointer duration-300 text-sm'>JPG La Belle Le Parfum</li>
            </ul>
          </Grid>
          <Grid xs md={3} item>
            <p className='font-semibold text-lg mb-2'>Partners</p>
            <div className='flex gap-5 items-center'>
              <ul className='text-sm'>
                <li className='flex w-fit items-center hover:translate-x-1 cursor-pointer duration-300 text-sm'>Christian Dior</li>
                <li className='flex w-fit items-center hover:translate-x-1 cursor-pointer duration-300 text-sm'>Versace</li>
                <li className='flex w-fit items-center hover:translate-x-1 cursor-pointer duration-300 text-sm'>Chanel</li>
                <li className='flex w-fit items-center hover:translate-x-1 cursor-pointer duration-300 text-sm'>Jean Paul Gaultier</li>
              </ul>
              <ul className='text-sm'>
                <li className='flex w-fit items-center hover:translate-x-1 cursor-pointer duration-300'>Ysl Libre</li>
                <li className='flex w-fit items-center hover:translate-x-1 cursor-pointer duration-300'>Montblanc Explorer</li>
                <li className='flex w-fit items-center hover:translate-x-1 cursor-pointer duration-300'>Aerin Lilea Path</li>
                <li className='flex w-fit items-center hover:translate-x-1 cursor-pointer duration-300'>JPG La Belle Le Parfum</li>
              </ul>
            </div>
          </Grid>
        </Grid>
    </div>
  )
}

export default Footer;