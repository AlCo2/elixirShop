import Layout from "@/Layout";
import { Link, usePage } from "@inertiajs/react";
import { Box, Chip, Container, Grid, Tab, Tabs } from "@mui/material";
import { FaUser } from "react-icons/fa";
import { FaHouseChimney, FaLocationPin } from "react-icons/fa6";
import PropTypes from 'prop-types';
import { useState } from "react";

const OrderStatus = ({status}) =>{
  if (status === 1){
    return (
      <Chip label={'Pending'} variant="outlined" size="small" sx={{borderRadius:1}} color="warning"/>
    )
  }else if (status === 2)
  {
    return (
      <Chip label={'Completed'} variant="outlined" size="small" sx={{borderRadius:1}} color="success"/>
    )
  }
  else if (status === 3){
    return (
      <Chip label={'Declined'} variant="outlined" size="small" sx={{borderRadius:1}} color="error"/>
    )
  }
}
const Order = ({order, email}) =>{
  const link = `/showorder?order_id=${order.id}` + (email?`&email=${email}`:'');
  return (
    <Link href={link}>
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

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const listorder = ({orders}) => {
  const { auth } = usePage().props;
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const pendingOrders = orders.filter((order)=>{
    if (order.status_id===1)
      return order;
  })

  const completedOrders = orders.filter((order)=>{
    if (order.status_id===2)
      return order;
  })

  const declenedOrders = orders.filter((order)=>{
    if (order.status_id===3)
      return order;
  })

  return (
      <div className="min-h-80 py-4">
        <Container>
          <div>
            <p className="font-Opensans font-bold text-xl">List of Orders</p>
          </div>
          <div>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label={"Pending " + pendingOrders.length} sx={{textTransform:'none'}} {...a11yProps(0)} />
                <Tab label={"Completed " + completedOrders.length} sx={{textTransform:'none'}} {...a11yProps(1)} />
                <Tab label={"Declined " + declenedOrders.length} sx={{textTransform:'none'}} {...a11yProps(2)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                {pendingOrders && pendingOrders.length > 0?
                  pendingOrders.map((order)=>(
                    <Order key={order.id} email={auth.user.email} order={order}/>
                  ))
                :
                  <div>Your order history is empty</div>
                }
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                {completedOrders && completedOrders.length > 0?
                  completedOrders.map((order)=>(
                    <Order key={order.id} email={auth.user.email} order={order}/>
                  ))
                :
                  <div>Your order history is empty</div>
                }
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                {declenedOrders && declenedOrders.length > 0?
                  declenedOrders.map((order)=>(
                    <Order key={order.id} email={auth.user.email} order={order}/>
                  ))
                :
                  <div>Your order history is empty</div>
                }
              </CustomTabPanel>
            </Box>
          </div>
        </Container>
      </div>
  )
}

listorder.layout = page => <Layout children={page} tite="Listorder" />
export default listorder;