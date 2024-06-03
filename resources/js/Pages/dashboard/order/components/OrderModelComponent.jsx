import { router } from "@inertiajs/react";
import { Box, Button, FormControl, Grid, IconButton, MenuItem, Modal, Select } from "@mui/material";
import { useState } from "react";
import { FaPen } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

const style = {  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 450,
  width:'80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius:2,
  p: 4,
};

function OrderModelComponent({order}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [values, setValues] = useState({
      status:order.status_id,
    })

    function handleSelectChange(e) {
      const { name, value } = e.target;
      setValues(prevValues => ({
          ...prevValues,
          [name]: value,
      }));
    }

    function handleUpdate(e) {
      e.preventDefault();
      router.patch('/api/order/'+order.id, values);
      handleClose();
    }
    
    return (
      <div>
        <button onClick={handleOpen} className='bg-blue-600 rounded-md border text-white p-2 flex items-center gap-2'><FaPen className='text-sm'/></button>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Grid container gap={1}>
              <Grid item xs={12} className='flex justify-between'>
                <p className='font-Poppins font-semibold'>Order #{order.id}</p>
                <IconButton size='small' onClick={handleClose}><FaXmark/></IconButton>
              </Grid>
              <Grid xs={12} md={5.8} item>
                  <div>
                  <label className='text-sm font-semibold font-Poppins opacity-70'>Customer</label>
                  </div>
                  <p className='ml-2 font-Opensans'>{order.order_detail.firstname + " " + order.order_detail.lastname}</p>
              </Grid>
              <Grid xs={12} md={5.8} item>
                <div>
                    <label className='text-sm font-semibold font-Poppins opacity-70'>Total</label>
                </div>
                <p className='ml-2 font-Poppins'>{order.total}DH</p>
              </Grid>
              <Grid xs={12} md={5.8} item>
                  <div>
                  <label className='text-sm font-semibold font-Poppins opacity-70'>Status</label>
                  </div>
                  <FormControl fullWidth>
                    <Select
                        labelId="status"
                        id="status"
                        name='status'
                        className='ml-2 h-8 text-black'
                        defaultValue={!order?"":order.status_id}
                        onChange={handleSelectChange}
                    >
                      <MenuItem value={1} >Pending</MenuItem>
                      <MenuItem value={2} >Completed</MenuItem> 
                      <MenuItem value={3} >Declined</MenuItem> 
                    </Select>
                  </FormControl>
              </Grid>
              <Grid item sx={{display:'flex', justifyContent:'space-between',flexDirection:'row-reverse'}} xs={12} mt={2}>
                <Button onClick={handleUpdate} variant='contained' size='small' color='dashboard_primary' sx={{borderRadius:'0.375rem'}}>Update</Button>
                <Button onClick={handleClose} variant='contained' size='small' color='error' sx={{borderRadius:'0.375rem'}}>Cancle</Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </div>
    );
  }
  export default OrderModelComponent;