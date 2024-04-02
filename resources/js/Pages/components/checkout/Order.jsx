import { Box } from "@mui/material";
import { BsTrashFill } from "react-icons/bs";

const Order = ({id,name, image,price, Q}) =>{
    return(
    <tr className=''>
    <td className='flex gap-4 items-center p-2'><Box minWidth={30} maxWidth={60}><img className='rounded-sm' src={`${image}`} alt="" /></Box>{name}</td>
    <td className='text-center'>{Q}</td>
    <td className="text-center">{price}DH</td>
    <td className='text-red-500 px-4'><BsTrashFill className='cursor-pointer' onClick={()=>console.log("deleted")}/></td>
    </tr>
    )
}

export default Order;