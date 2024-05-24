import { CartContext } from "@/Layout";
import product from "@/Pages/store/product/page";
import { Link, router } from "@inertiajs/react";
import { Box, Button, ButtonGroup } from "@mui/material";
import axios from "axios";
import { useContext, useState } from "react";
import { BsTrashFill } from "react-icons/bs";

const QuentityBar = ({id, product_id, products, setProducts, Q}) =>{
    const [q, setQ] = useState(Q);
    const { cartTotalProducts, setCartTotalProducts } = useContext(CartContext)
    function subFromCart(e){
        e.preventDefault();
        if (q < 2)
            return;
        const data = {
            product_id: product_id
        }
        axios.post('/api/cart/sub', data);
        const updatedProducts = [...products]
        updatedProducts[id].Q-=1;
        setProducts(updatedProducts);
        setCartTotalProducts(cartTotalProducts-1)
        setQ(q-1);
    }
    function addToCart(e){
        e.preventDefault();
        const data = {
            product_id: product_id
        }
        axios.post('/api/cart/add', data);
        const updatedProducts = [...products]
        updatedProducts[id].Q+=1;
        setCartTotalProducts(cartTotalProducts+1)
        setProducts(updatedProducts);
        setQ(q+1);
    }
    return(
        <>
        <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button onClick={subFromCart} color="liliana_dark" className="rounded-xl">-</Button>
            <Button disableRipple color="liliana_dark" sx={{color:'black', cursor:'default'}}>{q}</Button>
            <Button onClick={addToCart} color="liliana_dark" className="rounded-xl">+</Button>
        </ButtonGroup>
        </>
    )
}

const Order = ({id, product_id,name, image, price, Q, products, setProducts}) =>{
    const { cartTotalProducts, setCartTotalProducts } = useContext(CartContext)
    function deleteFromCart(e){
        e.preventDefault();
        const data = {
            product_id: product_id,
        }
        axios.post('/api/cart/delete', data);
        const updatedProducts = [...products];
        updatedProducts.splice(id, 1)
        setCartTotalProducts(cartTotalProducts-Q);
        setProducts(updatedProducts);
    }

    return(
    <tr className=''>
    <td className='flex gap-4 items-center p-2'><Link href={"/store/product/"+product_id}><Box minWidth={30} maxWidth={60}><img className='rounded-sm' src={`${image}`} alt="" /></Box></Link><Link href={"/store/product/"+product_id}>{name}</Link></td>
    <td className='text-center'><QuentityBar id={id} product_id={product_id} products={products} setProducts={setProducts} Q={Q}/></td>
    <td className="text-center">{price}DH</td>
    <td className='text-red-500 px-4'><BsTrashFill className='cursor-pointer' onClick={deleteFromCart}/></td>
    </tr>
    )
}

export default Order;