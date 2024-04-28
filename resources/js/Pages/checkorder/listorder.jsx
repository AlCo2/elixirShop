import Layout from "@/Layout";
import { Link } from "@inertiajs/react";
import { Chip, Container, Grid } from "@mui/material";
import { FaUser } from "react-icons/fa";
import { FaHouseChimney, FaLocationPin } from "react-icons/fa6";

const OrderStatus = ({status}) =>{
  if (status === 1){
    return (
      <Chip label={'Pending'} size="small" sx={{borderRadius:1}} color="warning"/>
    )
  }else if (status === 2)
  {
    return (
      <Chip label={'Completed'} size="small" sx={{borderRadius:1}} color="success"/>
    )
  }
  else if (status === 3){
    return (
      <Chip label={'Declined'} size="small" sx={{borderRadius:1}} color="error"/>
    )
  }
}
const Order = ({order}) =>{

  return (
    <Link href={"/showorder?order_id="+order.id}>
      <div className="bg-white hover:bg-blue-200 hover:bg-opacity-20 border-2 rounded-xl p-4 mb-2">
        <div className="flex justify-between flex-wrap">
          <p className="opacity-50 font-semibold font-Poppins">#{order.id}</p>
          <OrderStatus status={order.status_id}/>
        </div>
        <Grid container alignItems={'center'} mt={2}>
          <Grid xs md={2} item>
            <p className="opacity-50 font-semibold text-xs font-Poppins flex items-center gap-2"><FaHouseChimney/> {order.order_detail.city}, {order.order_detail.address}</p>
          </Grid>
          <Grid xs md={1} item>
            <p className="opacity-50 font-semibold text-xs font-Poppins flex items-center gap-2"><FaLocationPin/> {order.order_detail.country}</p>
          </Grid>
          <Grid xs md={2} item>
            <p className="opacity-50 font-semibold text-xs font-Poppins flex items-center gap-2"><FaUser/> {order.order_detail.firstname +' '+ order.order_detail.lastname}</p>
          </Grid>
        </Grid>
      </div>
    </Link>
  )
}

const listorder = ({orders}) => {
  return (
      <div className="min-h-80 py-4">
        <Container>
          {orders && orders.length > 0?
            orders.map((order)=>(
              <Order key={order.id} order={order}/>
            ))
          :
            <div>Your order history is empty</div>
          }
        </Container>
      </div>
  )
}

listorder.layout = page => <Layout children={page} tite="Listorder" />
export default listorder;