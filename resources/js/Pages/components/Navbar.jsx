import AccountMenu from './AccountMenu';
import SideBar from './SideBar';
import { usePage } from '@inertiajs/react';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { CartContext } from '@/Layout';
import SideBarCart from './sideBarCart';
import FavouriteBar from './FavouriteBar';

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  const { cart, auth } = usePage().props;
  const { cartTotalProducts, setCartTotalProducts } = useContext(CartContext);
  const pathname = window.location.pathname

  const handleScroll = () => {
    const currentScrollPos = window.scrollY
    if(currentScrollPos < 50){
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
    <nav className={'max-sm:hidden flex justify-center bg-black text-white items-center duration-700 z-10 fixed w-screen h-12 top-0 '+ (sticky?'translate-y-0':'-translate-y-full')}>
      <ul className='flex gap-5 md:gap-10 items-center font-Poppins'>
        <li><a className={`duration-300 font-semibold hover:opacity-100 flex items-center gap-1 ${pathname==='/'?'opacity-100':'opacity-60'}`} href="/">Home</a></li>
        <li><a className={`duration-300 font-semibold hover:opacity-100 flex items-center gap-1 ${pathname==='/store'?'opacity-100':'opacity-60'}`}  href="/store">Parfumes</a></li>
        <li><a className={`duration-300 font-bold hover:opacity-100 flex items-center gap-1 ${pathname==='/store/woman'?'opacity-100':'opacity-60'}`} href="/store/woman">Woman</a></li>
        <li><a className={`duration-300 font-bold hover:opacity-100 flex items-center gap-1 ${pathname==='/store/man'?'opacity-100':'opacity-60'}`} href="/store/man">Man</a></li>
        {auth.user && auth.user.role_id==1?
        <li><a className={`duration-300 font-bold hover:opacity-100 flex items-center gap-1 ${pathname==='/promotions'?'opacity-100':'opacity-60'}`} href="/dashboard">Dashboard</a></li>
        :
        <></>
        }
        <li className='flex items-center'>
          <AccountMenu down={true}/>
          <FavouriteBar down={true}/>
          <SideBarCart down={true}/>
        </li>
      </ul>
    </nav>
    <nav className='max-sm:hidden flex justify-between text-black items-center h-20'>
        <a href='/' className='flex items-center ml-2'>
          <p className="text-xl font-black font-Poppins ml-10 duration-300">Liliana</p>
        </a>
        <div className=''>
            <ul className='flex gap-5 md:gap-10 font-Poppins'>
                <li><a className={`duration-300 font-bold hover:opacity-100 flex items-center gap-1 ${pathname==='/'?'opacity-100':'opacity-60'}`} href="/">Home</a></li>
                <li><a className={`duration-300 font-bold hover:opacity-100 flex items-center gap-1 ${pathname==='/store'?'opacity-100':'opacity-60'}`}  href="/store">Parfumes</a></li>
                <li><a className={`duration-300 font-bold hover:opacity-100 flex items-center gap-1 ${pathname==='/store/woman'?'opacity-100':'opacity-60'}`} href="/store/woman">Woman</a></li>
                <li><a className={`duration-300 font-bold hover:opacity-100 flex items-center gap-1 ${pathname==='/store/man'?'opacity-100':'opacity-60'}`} href="/store/man">Man</a></li>
                {auth.user && auth.user.role_id==1?
                <li><a className={`duration-300 font-bold hover:opacity-100 flex items-center gap-1 ${pathname==='/promotions'?'opacity-100':'opacity-60'}`} href="/dashboard">Dashboard</a></li>
                :
                null
                }
            </ul>
        </div>
        <div className='flex mr-4 items-center'>
          <AccountMenu />
          <FavouriteBar/>
          <SideBarCart/>
        </div>
    </nav>
    <nav className='sm:hidden flex justify-between items-center h-20'>
      <a href='/' className='flex items-center ml-2'>
        <p className="text-xl font-black font-Poppins ml-10 duration-300">Liliana</p>
      </a>
      <div className='flex items-center gap-3'>
        <SideBarCart/>
        <FavouriteBar/>
        <SideBar/>
      </div>
    </nav>
    </>
  )
}

export default Navbar;