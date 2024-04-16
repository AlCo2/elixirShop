import { Box, Button, ButtonGroup } from "@mui/material";
import { useState } from "react";
import { BsTrashFill } from "react-icons/bs";

const QuentityBar = ({Q}) =>{
    const [q, setQ] = useState(1)
    return(
        <>
        <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button onClick={()=>{q>1?setQ(q-1):null}} color="liliana_primary" className="rounded-xl">-</Button>
            <Button disableRipple color="liliana_primary" sx={{color:'black', cursor:'default'}}>{q}</Button>
            <Button onClick={()=>{setQ(q+1)}} color="liliana_primary" className="rounded-xl">+</Button>
        </ButtonGroup>
        </>
    )
}

const Order = ({id, name, image, price, Q}) =>{
    return(
    <tr className=''>
    <td className='flex gap-4 items-center p-2'><Box minWidth={30} maxWidth={60}><img className='rounded-sm' src={`${image}`} alt="" /></Box>{name}</td>
    <td className='text-center'><QuentityBar Q={Q}/></td>
    <td className="text-center">{price}DH</td>
    <td className='text-red-500 px-4'><BsTrashFill className='cursor-pointer' onClick={()=>console.log("deleted")}/></td>
    </tr>
    )
}

export default Order;