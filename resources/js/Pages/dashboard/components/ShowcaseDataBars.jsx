import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Bar, BarChart, Tooltip, XAxis, YAxis } from 'recharts';

const data = [ 
    {name:'Jan', data:3200},
    {name:'Feb', data:1600},
    {name:'Mar', data:1300},
    {name:'Avr', data:2600},
    {name:'May', data:955},
    {name:'Jun', data:3432},
    {name:'Jul', data:2343},
  ]

const ShowcaseDataBars = ({total_sales}) => {
  return (
    <Grid xs={12} md={4} item>
        <Box sx={{bgcolor:'white', height:280, borderWidth:1, mb:1, borderRadius:4}}>
            <Box sx={{p:2, display:'flex', alignItems:'center', justifyContent:'space-between'}} >
            <Box>
                <p className="font-Roboto font-semibold text-xl">Sales</p>
                <p className="text-xs opacity-70">Product have been saled</p>
            </Box>
            <Box>
                <Button href="/dashboard/order" variant="outlined" sx={{borderRadius:4, color:'black', borderColor:'black'}} size="small">See detail</Button>
            </Box>
            </Box>
            <Box sx={{px:2, display:'flex', flexDirection:'column', overflowX:'auto'}}>
            <Box sx={{ display:'flex', flexDirection:'column', justifyContent:'space-between', height:70}}>
                <Typography sx={{color:'#7c62ff', fontSize:'1.875rem', lineHeight:'2.25rem', fontWeight:700, fontFamily:'Poppins'}}>{total_sales}DH</Typography>
                <p className="text-sm font-Poppins"><span className="text-green-500">7K+</span> <span className="text-xs opacity-70">Increase</span></p>
            </Box>
            <BarChart width={300} height={130} data={data}>
                <XAxis dataKey='name' axisLine={false} tickLine={false} className="font-Poppins text-sm" />
                <Bar dataKey="data" fill="#7c62ff" radius={10}/>
            </BarChart>
            </Box>
        </Box>
        <Box sx={{bgcolor:'white', height:230, mb:1,borderWidth:1, borderRadius:4}}>
            <Box sx={{p:2, display:'flex', alignItems:'center', justifyContent:'space-between'}} >
            <Box>
                <p className="font-Roboto font-semibold text-xl">Audience</p>
                <p className="text-xs opacity-70">Customers have visited website</p>
            </Box>
            <Box>
                <IconButton size="small"><BsThreeDotsVertical/></IconButton>
            </Box>
            </Box>
            <Box sx={{px:2, overflowX:'auto'}}>
            <BarChart layout="vertical" width={300} height={130} data={[{name:'Male', view:1345},{name:'Female', view:2122},{name:'Other', view:635},]}>
                <YAxis dataKey='name' type="category" axisLine={false} tickLine={false} className="font-Poppins text-sm" />
                <XAxis type="number" axisLine={false} tickLine={false}/>
                <Tooltip/>
                <Bar dataKey="view" fill="#feca33" radius={8}/>
            </BarChart>
            </Box>
        </Box>
    </Grid>
  )
}

export default ShowcaseDataBars;