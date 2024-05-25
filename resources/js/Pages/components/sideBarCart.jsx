import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import { IoClose } from "react-icons/io5";
import { BiShoppingBag } from 'react-icons/bi';
import { Badge, Button, CircularProgress, Divider, IconButton } from '@mui/material';
import { useContext, useState } from 'react';
import { CartContext } from '@/Layout';
import axios from 'axios';

const CartItem = ({id, products, setProducts, product, Q}) =>{
    const { cartTotalProducts, setCartTotalProducts } = useContext(CartContext);
    function deleteFromCart(e){
        e.preventDefault();
        const data = {
            product_id: product.id,
        }
        axios.post('/api/cart/delete', data);
        const updatedProducts = [...products];
        updatedProducts.splice(id, 1)
        setProducts(updatedProducts);
        setCartTotalProducts(cartTotalProducts-Q);
    }
    return(
    <>
        <div className='flex justify-between'>
            <div className='flex gap-5'>
                <div className='bg-white'>
                    <img className='w-24 h-24 scale-75 rounded-sm' src={product.images[0].url} alt="pic" />
                </div>
                <div className='flex flex-col gap-2 py-2 h-full w-48'>
                    <p className='font-Poppins text-sm font-semibold'>{product.title}</p>
                    <p className='font-Roboto text-sm'><span className='opacity-60'>{Q}x</span>{product.promotion&&product.promotion.active?product.promotion.promotion_price:product.price}.00DH</p>
                </div>
            </div>
            <div className='p-4'>
                <IoClose onClick={deleteFromCart} className='cursor-pointer'/>
            </div>
        </div>
        <Divider/>
    </>
)
}

export default function SideBarCart({down}) {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const { cartTotalProducts } = useContext(CartContext);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
    if (newOpen)
    {
        fetchProduct();
    }
  };

  const fetchProduct = async () =>{
    setLoading(true);
    const response = await axios.post('/api/cart').catch((error)=>console.log(error));
    setCart(response.data);
    setLoading(false);
  }
  const DrawerList = (
    <Box sx={{ width: 330 }} role="presentation">
        <div className='flex justify-between items-center p-4'>
            <p className='text-xl font-Poppins font-bold'>Shopping Cart</p>
            <IoClose className='cursor-pointer text-xl' onClick={toggleDrawer(false)}/>
        </div>
        <Divider/>
        {!loading && cart? 
            cart.length>0?
            <div className='flex flex-col'>
                {cart.map((item, index)=>(
                    <CartItem key={item.product.id} product={item.product} id={index} products={cart} setProducts={setCart} Q={item.Q}/>
                ))}
            </div>
            :
            <div className='flex justify-center pt-20'>
                <p className='font-bold font-Poppins opacity-70'>Your shopping cart is empty</p>
            </div>
        :
        <div className='flex justify-center pt-20'>
            <CircularProgress/>
        </div>
        }
        {cart && cart.length>0?
            <div className='flex flex-col gap-4 items-center my-5'>
                <Button sx={{width:200}} href='/checkout/fastcheckout' variant='contained' color='liliana_dark'>Checkout</Button>
                <Button sx={{width:200}} href='/checkout' variant='outlined' color='liliana_dark'>View Cart</Button>
            </div>
        :
        null
        }
    </Box>
  );
  return (
    <div>
        <IconButton onClick={toggleDrawer(true)} aria-label="cart">
            <Badge badgeContent={cartTotalProducts} color="info">
                <BiShoppingBag className={down?'text-white':'text-black'}/>
            </Badge>
        </IconButton>
        <Drawer open={open} onClose={toggleDrawer(false)} anchor='right'>
            {DrawerList}
        </Drawer>
    </div>
  );
}