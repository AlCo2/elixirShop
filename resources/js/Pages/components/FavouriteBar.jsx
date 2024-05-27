import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { IoClose } from "react-icons/io5";
import { CircularProgress, Divider, IconButton } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { BsHeartFill } from 'react-icons/bs';
import { Link } from '@inertiajs/react';
import { BiHeart } from 'react-icons/bi';

const CartItem = ({products, setProducts, product}) =>{
    function deleteFromCart(e){
        e.preventDefault();
        const data = {
            product_id: product.id,
        }
        axios.post('/favourite', data);
        const updatedProducts = products.filter(p => p.id !== product.id);
        setProducts(updatedProducts);
    }
    return(
    <>
        <div className='flex justify-between'>
            <div className='flex gap-5'>
                <Link href={'/store/product/'+product.id}>
                <div className='bg-white'>
                    <img className='w-24 h-24 scale-75 rounded-sm' src={product.images[0].url} alt="pic" />
                </div>
                </Link>
                <div className='flex flex-col gap-2 py-2 h-full w-48'>
                    <Link href={'/store/product/'+product.id}>
                        <p className='font-Poppins text-sm font-semibold'>{product.title}</p>
                    </Link>
                    <p className='font-Roboto text-sm'>{product.promotion&&product.promotion.active?product.promotion.promotion_price:product.price}.00DH</p>
                </div>
            </div>
            <div className='p-4'>
                <BsHeartFill onClick={deleteFromCart} className='text-red-500 cursor-pointer'/>
            </div>
        </div>
        <Divider/>
    </>
)
}

export default function FavouriteBar({down}) {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
    if (newOpen)
    {
        fetchProduct();
    }
  };

  const fetchProduct = async () =>{
    setLoading(true);
    const response = await axios.post('/favourites/products').catch((error)=>{
        if(error.response.status === 401)
        {
            setProducts([]);
            setLoading(false);
        }
        else
            console.log(error)
    });
    setProducts(response.data);
    setLoading(false);
  }
  const DrawerList = (
    <Box sx={{ width: 330 }} role="presentation">
        <div className='flex justify-between items-center p-4'>
            <p className='text-xl font-Poppins font-bold'>Favourites</p>
            <IoClose className='cursor-pointer text-xl' onClick={toggleDrawer(false)}/>
        </div>
        <Divider/>
        {!loading && products? 
            products.length>0?
            <div className='flex flex-col'>
                {products.map((product)=>(
                    <CartItem key={product.id} product={product} products={products} setProducts={setProducts}/>
                ))}
            </div>
            :
            <div className='flex justify-center pt-20'>
                <p className='font-bold font-Poppins opacity-70'>Your Favourite list is empty</p>
            </div>
        :
        <div className='flex justify-center pt-20'>
            <CircularProgress/>
        </div>
        }
    </Box>
  );
  return (
    <div>
        <IconButton onClick={toggleDrawer(true)} aria-label="cart">
            <BiHeart className={down?'text-white':'text-black'}/>
        </IconButton>
        <Drawer open={open} onClose={toggleDrawer(false)} anchor='right'>
            {DrawerList}
        </Drawer>
    </div>
  );
}