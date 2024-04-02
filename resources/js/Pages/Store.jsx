'use client'
import { Box, Button, Checkbox, Container, FormControlLabel, FormGroup, Grid, IconButton, Menu, MenuItem, Paper } from '@mui/material';
import { useState } from 'react';
import { CgSortAz } from "react-icons/cg";
import SuggestionCard from './components/SuggestionCard';
import Navbar from './components/Navbar';

const store = () => {
  const [categories, setCategories] = useState([
    {id:1,name:'Brum', status:false},
    {id:2,name:'Corps et bain', status:false},
    {id:3,name:'Packs', status:false},
    {id:4,name:'Parfum', status:false},
    {id:5,name:'Maquillage', status:false},
    {id:6,name:'Soin de visage', status:false},
  ])
  const [selectAll, setSelectAll] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    setCategories(categories.map(category => ({ ...category, status: checked })));
  };

  const handleCheckboxChange = (id) => (e) => {
    setCategories(prevCategories =>
      prevCategories.map(category =>
        category.id === id ? { ...category, status: e.target.checked } : category
      )
    );
  };

  return (
    <>
    <Navbar page={'store'}/>
      <div className='min-h-screen pt-5 bg-liliana-background'>
        <Container>
          <Grid container columns={12} justifyContent={'center'} gap={2}>
            <Grid xs={2} item className='max-xl:hidden'>
              <Paper className='p-5 rounded-md'>
                <p className='font-bold'>categories</p>
                <FormControlLabel control={<Checkbox onChange={handleSelectAllChange}/>} label="All" />
                <FormGroup className='pl-5'>
                  {categories.map(category=>(
                    <FormControlLabel key={category.id} control={<Checkbox checked={category.status} size='small' onChange={handleCheckboxChange(category.id)} />} label={category.name} />  
                  ))}
                </FormGroup>
              </Paper>
            </Grid>
            <Grid md={9} item>
              <Paper className='p-5 pb-1 rounded-md'>
                <Grid container alignItems={'center'} justifyContent={'space-between'}>
                  <Grid item>
                    <p className='font-bold text-sm opacity-70'>23 Items</p>
                  </Grid>
                  <Grid item display={'flex'} alignItems={'center'} gap={2}>
                    <Box className='xl:hidden'>
                      <Button  id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}>
                        Categories
                      </Button>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}
                      >
                        <FormControlLabel className='pl-2' control={<Checkbox onChange={handleSelectAllChange}/>} label="All" />
                        <FormGroup className='pl-5'>
                          {categories.map(category=>(
                            <FormControlLabel key={category.id} control={<Checkbox checked={category.status} size='small' onChange={handleCheckboxChange(category.id)} />} label={category.name} />  
                          ))}
                        </FormGroup>
                      </Menu>
                    </Box>
                    <Box display={'flex'} alignItems={'center'}>
                      <p className='text-sm'>Filter</p>
                      <IconButton>
                        <CgSortAz className='text-xl'/>
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
              <Grid container gap={1} marginY={5} justifyContent={{xs:'center'}} mt={2}>
                <SuggestionCard title='اميرة العرب ORIGINAL 100ML' image='/assets/amirataraboriginal.jpg' price={250}/>
                <SuggestionCard title='GLOSSE KIKO MILANO' image='/assets/kiko.jpg' price={70}/>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div> 
    </>
  )
}

export default store;