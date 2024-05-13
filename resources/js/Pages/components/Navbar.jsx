import { Badge, IconButton } from '@mui/material';
import { BiPhoneCall, BiShoppingBag } from 'react-icons/bi'
import {BsHouse, BsShop, BsTicket, } from 'react-icons/bs'
import AccountMenu from './AccountMenu';
import SideBar from './SideBar';
import { usePage } from '@inertiajs/react';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { CiSettings } from 'react-icons/ci';
import { CartContext } from '@/Layout';

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  const { cart, auth } = usePage().props;
  const { cartTotalProducts, setCartTotalProducts } = useContext(CartContext);
  const pathname = window.location.pathname

  const handleScroll = () => {
    const currentScrollPos = window.scrollY
    if(currentScrollPos < 80){
        setSticky(false)
    }else{
        setSticky(true)
    }
  }
  useEffect(()=>{
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
    <nav className={'max-sm:hidden flex justify-center bg-liliana-primary text-white items-center duration-700 z-10 fixed w-screen h-12 top-0 '+ (sticky?'translate-y-0':'-translate-y-full')}>
      <ul className='flex gap-5 md:gap-10 items-center font-Poppins'>
        <li><a className={`duration-300 font-semibold hover:text-black flex items-center gap-1 ${pathname==='/'?'text-black':''}`} href="/"><BsHouse/>Home</a></li>
        <li><a className={`duration-300 font-semibold hover:text-black flex items-center gap-1 ${pathname==='/store'?'text-black':''}`}  href="/store"><BsShop/>Store</a></li>
        <li><a className={`duration-300 font-semibold hover:text-black flex items-center gap-1 ${pathname==='/promotions'?'text-black':''}`} href="/promotions"><BsTicket/>Promotions</a></li>
        {auth.user && auth.user.role_id==1?
        <li><a className={`duration-300 font-semibold hover:text-black flex items-center gap-1 ${pathname==='/promotions'?'text-black':''}`} href="/dashboard"><CiSettings/>Dashboard</a></li>
        :
        <></>
        }
        <li className='flex items-center'><BiPhoneCall/><p className='font-Poppins'>+212 614 903 001</p></li>
        <li className='flex items-center'>
          <AccountMenu />
          <IconButton href='/checkout' className={`${pathname==='/checkout'?'text-black':'text-white'}`} aria-label="cart">
            <Badge badgeContent={cartTotalProducts} className={`${pathname==='/checkout'?'text-black':'text-white'}`} color="primary">
              <BiShoppingBag/>
            </Badge>
          </IconButton>
        </li>
      </ul>
    </nav>
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
                {auth.user && auth.user.role_id==1?
                <li><a className={`duration-300 font-semibold hover:text-black flex items-center gap-1 ${pathname==='/promotions'?'text-black':''}`} href="/dashboard"><CiSettings/> Dashboard</a></li>
                :
                null
                }
            </ul>
        </div>
        <div className='flex mr-4 items-center'>
          <AccountMenu />
          <IconButton href='/checkout' className={`${pathname==='/checkout'?'text-black':'text-white'}`} aria-label="cart">
            <Badge badgeContent={cartTotalProducts} className={`${pathname==='/checkout'?'text-black':'text-white'}`} color="primary">
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
        <Badge badgeContent={cartTotalProducts} className={`${pathname==='/checkout'?'text-black':'text-white'}`} color="primary">
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