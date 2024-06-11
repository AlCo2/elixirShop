import { router } from "@inertiajs/react";
import { Box, Button, Grid, IconButton, Modal } from "@mui/material";
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
  

function CategoryModelComponent({category}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [values, setValues] = useState({
      name:"",
    })
    function handleChange(e) {
      const key = e.target.id;
      const value = e.target.value
      setValues(values => ({
          ...values,
          [key]: value,
      }))
    }
    function handleSubmit(e) {
      e.preventDefault();
      router.post('/category', values);
      values.name = "";
      handleClose();
    }
    function handleUpdate(e) {
      e.preventDefault();
      router.patch('/category/'+category.id, values);
      handleClose();
    }
    return (
      <div>
        {!category?
        <Button onClick={handleOpen} variant='contained' color='dashboard_primary' size='small' sx={{borderRadius:'0.375rem', textTransform:'none'}}>+ New Category</Button>
        :
        <button onClick={()=>{values.name=category.name;handleOpen()}} className='bg-liliana-background rounded-md border text-black opacity-70 p-2'><FaPen className='text-sm'/></button>
        }
        <Modal 
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Grid container gap={1}>
              <Grid item xs={12} className='flex justify-between'>
                <p className='font-Poppins font-semibold'>Add Category</p>
                <IconButton size='small' onClick={handleClose}><FaXmark/></IconButton>
              </Grid>
              <Grid xs={12} item>
                  <div>
                      <label className='text-sm font-semibold font-Opensans'>category</label>
                  </div>
                  <input id='name' type="text" value={values.name} onChange={handleChange} className='border-2 rounded-md h-8 p-1 text-sm xl:w-full'/>
              </Grid>
              <Grid item sx={{display:'flex', justifyContent:'space-between',flexDirection:'row-reverse'}} xs={12} mt={2}>
                {!category?
                  <Button size='small' onClick={handleSubmit} variant='contained' color='success' sx={{borderRadius:'0.375rem'}}>Add</Button>
                :
                  <Button size='small' onClick={handleUpdate} variant='contained' color='primary' sx={{borderRadius:'0.375rem'}}>Update</Button>
                }
                <Button size='small' onClick={handleClose} variant='contained' color='error' sx={{borderRadius:'0.375rem'}}>Cancle</Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </div>
    );
  }
export default CategoryModelComponent;