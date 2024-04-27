import { Link, router } from "@inertiajs/react";
import { Box, Button, ButtonGroup } from "@mui/material";
import { BsTrashFill } from "react-icons/bs";

const QuentityBar = ({id, q}) =>{
    function subFromCart(e){
        e.preventDefault();
        if (q < 2)
            return;
        const data = {
            product_id: id
        }
        router.post('/api/cart/sub', data);
    }
    function addToCart(e){
        e.preventDefault();
        const data = {
            product_id: id
        }
        router.post('/api/cart/add', data);
    }
    return(
        <>
        <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button onClick={subFromCart} color="liliana_primary" className="rounded-xl">-</Button>
            <Button disableRipple color="liliana_primary" sx={{color:'black', cursor:'default'}}>{q}</Button>
            <Button onClick={addToCart} color="liliana_primary" className="rounded-xl">+</Button>
        </ButtonGroup>
        </>
    )
}

const Order = ({id, name, image, price, Q}) =>{
    function deleteFromCart(e){
        e.preventDefault();
        const data = {
            product_id: id,
        }
        router.post('/api/cart/delete', data);
    }

    return(
    <tr className=''>
    <td className='flex gap-4 items-center p-2'><Link href={"/store/product/"+id}><Box minWidth={30} maxWidth={60}><img className='rounded-sm' src={`${image}`} alt="" /></Box></Link><Link href={"/store/product/"+id}>{name}</Link></td>
    <td className='text-center'><QuentityBar id={id} q={Q}/></td>
    <td className="text-center">{price}DH</td>
    <td className='text-red-500 px-4'><BsTrashFill className='cursor-pointer' onClick={deleteFromCart}/></td>
    </tr>
    )
}

export default Order;