import { Badge, IconButton } from '@mui/material';
import { BiShoppingBag } from 'react-icons/bi'
import {BsHouse, BsShop, BsTicket, } from 'react-icons/bs'
import AccountMenu from './AccountMenu';
import SideBar from './SideBar';

const Navbar = () => {
  const pathname = window.location.pathname
  return (
    <>
    <nav className='max-sm:hidden flex justify-between bg-liliana-primary text-white items-center h-20'>
        <a href='/' className='flex items-center ml-2'>
          <img className='rounded-lg' src="/assets/lilianacolorfullogo.jpg" width={50} alt="logo" />
          <p className="text-xl font-bold font-Poppins ml-2 duration-300">Liliana</p>
        </a>
        <div className=''>
            <ul className='flex gap-5 md:gap-10 font-Poppins'>
                <li><a className={`duration-300 font-semibold hover:text-black flex items-center gap-1 ${pathname==='/'?'text-black':''}`} href="/"><BsHouse/>Home</a></li>
                <li><a className={`duration-300 font-semibold hover:text-black flex items-center gap-1 ${pathname==='/store'?'text-black':''}`}  href="/store"><BsShop/>Store</a></li>
                <li><a className={`duration-300 font-semibold hover:text-black flex items-center gap-1 ${pathname==='/promotions'?'text-black':''}`} href="/promotions"><BsTicket/>Promotions</a></li>
            </ul>
        </div>
        <div className='flex mr-4 items-center'>
          <AccountMenu />
          <IconButton href='/checkout' className={`${pathname==='/checkout'?'text-black':'text-white'}`} aria-label="cart">
            <Badge badgeContent={1} className={`${pathname==='/checkout'?'text-black':'text-white'}`} color="primary">
              <BiShoppingBag/>
            </Badge>
          </IconButton>
        </div>
    </nav>
    <nav className='sm:hidden bg-liliana-primary flex justify-between items-center h-20'>
      <a href='/' className='flex items-center ml-2'>
        <img className='rounded-lg' src="/assets/lilianacolorfullogo.jpg" width={50} alt="logo" />
        <p className="text-xl font-bold font-Poppins ml-2 duration-300 text-white">Liliana</p>
      </a>
      <div className='flex items-center gap-3'>
        <IconButton href='/checkout' aria-label="cart">
          <Badge badgeContent={1} color="primary">
            <BiShoppingBag className='text-white'/>
          </Badge>
        </IconButton>
        <SideBar/>
      </div>
    </nav>
    </>
  )
}

export default Navbar;