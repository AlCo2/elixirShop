import { router } from "@inertiajs/react";
import { Box, Button, FormControl, Grid, IconButton, MenuItem, Modal, Select } from "@mui/material";
import { useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";



const style = {  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 450,
  width:'80%',
  height:'90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius:2,
  p: 4,
};

function ProductModelComponent({product, categories}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [selectedImage, setSelectedImage] = useState({
      image:null,
      image2:null,
      image3:null,
    });
    const [values, setValues] = useState({
      title:"",
      description:"",
      Qty: "",
      category_id:"",
      price: "",
      image: null,
      image2: null,
      image3:null,
    })
  
    function handleSelectChange(e) {
      const { name, value } = e.target;
      setValues(prevValues => ({
          ...prevValues,
          [name]: value,
      }));
    }
    function handleChange(e) {
      const { id, value, type } = e.target;
      setValues(prevValues => ({
        ...prevValues,
        [id]: type === 'file' ? e.target.files[0] : value, // If it's a file input, get the file, otherwise get the value
      }));
      if (e.target.files && e.target.files[0]) {
        setSelectedImage(v =>({
          ...v,
          [id]: URL.createObjectURL(e.target.files[0])
        }));
      }
    }
    
    const prepereUpdate = (product) =>{
      values.title = product.title;
      values.description = product.description;
      values.category_id = product.category_id;
      values.Qty = product.Qty;
      values.price = product.price;
      values.image = null;
      values.image2 = null; 
      values.image3 = null;
      selectedImage.image = null
      selectedImage.image2 = null
      selectedImage.image3 = null
    }
  
    function handleUpdate(e) {
      e.preventDefault();
      router.patch(route('product.update', product.id), values);
      handleClose();
    }
    return (
      <div>
        <Button onClick={()=>{prepereUpdate(product);handleOpen();}} sx={{textTransform:'none', backgroundColor:'#f1f1f1', color:'black'}} color="liliana_white" size="small" variant="contained"><FaPen/>Edit</Button>
        <Modal 
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Grid container gap={1}>
              <Grid item xs={12} className='flex justify-between'>
                <p className='font-Poppins font-semibold'>{product?"Update Product":"Add New Product"}</p>
                <IconButton size='small' onClick={handleClose}><FaXmark/></IconButton>
              </Grid>
              <Grid xs={12} md={5.8} item>
                  <div>
                      <label className='text-sm font-semibold font-Opensans'>Title</label>
                  </div>
                  <input value={values.title} onChange={handleChange} type="text" className='border-2 rounded-md h-8 p-1 text-sm xl:w-full' name="title" id="title" />
              </Grid>
              <Grid xs={12} md={5.8} item>
                  <div>
                      <label className='text-sm font-semibold font-Opensans'>Category</label>
                  </div>
                  <FormControl fullWidth>
                    <Select
                        labelId="category"
                        id="category"
                        name='category'
                        className='h-8 text-black'
                        defaultValue={product?values.category:""}
                        onChange={handleSelectChange}
                        value={values.category}    
                    >
                      {categories.map((category)=>(
                        <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
              </Grid>
              <Grid xs={12} item>
                  <div>
                      <label className='text-sm font-semibold font-Opensans'>Description</label>
                  </div>
                  <textarea value={values.description} onChange={handleChange} rows={4} className='border-2 rounded-md p-1 text-sm xl:w-full' name="description" id="description"  />
              </Grid>
              <Grid xs={12} md={5.8} item>
                  <div>
                      <label className='text-sm font-semibold font-Opensans'>Q</label>
                  </div>
                  <input value={values.Q} onChange={handleChange} type="number" className='border-2 rounded-md h-8 p-1 text-sm xl:w-full' name="Q" id="Q" />
              </Grid>
              <Grid xs={12} md={5.8} item>
                  <div>
                      <label className='text-sm font-semibold font-Opensans'>price</label>
                  </div>
                  <input value={values.price} onChange={handleChange} type="number" className='border-2 rounded-md h-8 p-1 text-sm xl:w-full' name="price" id="price" />
              </Grid>
              <Grid xs={12} item>
                  <div>
                      <label className='text-sm font-bold font-Opensans'>image</label>
                  </div>
                  <input type="file" onChange={handleChange} name="image" id="image" />
                  <div className='flex items-center gap-2 my-2'>
                    {product?
                    <img width={60} height={60} src={selectedImage.image?selectedImage.image:product.images[0]?product.images[0].url:null} />
                    :
                    <img width={60} height={60} src={selectedImage.image} />
                    }
                    {(product && product.images[0]) || selectedImage.image?
                      <IconButton onClick={()=>deletePic('image', 0)}color="error">
                        <FaTrash />
                      </IconButton>
                    :
                    null
                    }
                  </div>
              </Grid>
              <Grid xs={12} item>
                  <div>
                      <label className='text-sm font-semibold font-Opensans'>image 2</label>
                  </div>
                  <input type="file" onChange={handleChange} name="image2" id="image2" />
                  <div className='flex items-center gap-2 my-2'>
                    {product?
                    <img width={60} height={60} src={selectedImage.image2?selectedImage.image2:product.images[1]?product.images[1].url:null} />
                    :
                    <img width={60} height={60} src={selectedImage.image2} />
                    }
                    {(product && product.images[1]) || selectedImage.image2?
                      <IconButton onClick={()=>deletePic('image2', 1)}color="error">
                        <FaTrash />
                      </IconButton>
                    :
                    null
                    }
                  </div>
              </Grid>
              <Grid xs={12} item>
                  <div>
                      <label className='text-sm font-semibold font-Opensans'>image 3</label>
                  </div>
                  <input type="file" onChange={handleChange} name="image3" id="image3" />
                  <div className='flex items-center gap-2 my-2'>
                    {product?
                    <img width={60} height={60} src={selectedImage.image3?selectedImage.image3:product.images[2]?product.images[2].url:null} />
                    :
                    <img width={60} height={60} src={selectedImage.image3} />
                    }
                    {(product && product.images[2]) || selectedImage.image3?
                      <IconButton onClick={()=>deletePic('image3', 2)}color="error">
                        <FaTrash />
                      </IconButton>
                    :
                    null
                    }
                  </div>
              </Grid>
              <Grid item sx={{display:'flex', justifyContent:'space-between',flexDirection:'row-reverse'}} xs={12} mt={2}>
                <Button size='small' onClick={handleUpdate} variant='contained' color='dashboard_primary' sx={{borderRadius:'0.375rem'}}>Update</Button>
                <Button size='small' onClick={handleClose} variant='contained' color='error' sx={{borderRadius:'0.375rem'}}>Cancle</Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </div>
    );
}
const EditProduct = ({product, categories}) => {
  return (
    <ProductModelComponent product={product} categories={categories}/>
  )
}

export default EditProduct