import { Box, Grid, Typography } from '@mui/material';
import { SparkLineChart } from '@mui/x-charts';
import React from 'react'

const ShowcaseData = ({title, subTitle, total, data}) => {
  return (
    <Grid xs sx={{borderRadius:4, bgcolor:'white', borderWidth:1}} item>
        <Box sx={{p:2}}>
        <p className="font-Roboto font-semibold text-xl">{title}</p>
        <p className="text-xs opacity-70">{subTitle}</p>
        </Box>
        <Box sx={{pl:2, display:'flex', alignItems:'center'}}>
        <Box sx={{ display:'flex', flexDirection:'column', justifyContent:'space-between', height:70}}>
            <Typography sx={{color:'#7c62ff', fontSize:'1.875rem', lineHeight:'2.25rem', fontWeight:700, fontFamily:'Poppins'}}>{total}</Typography>
            <p className="text-sm font-Poppins"><span className="text-green-500">1K+</span> <span className="text-xs opacity-70">Increase</span></p>
        </Box>
        <SparkLineChart area colors={['#7c62ff']} curve="natural" data={data} width={100} height={70} showHighlight showTooltip/>
        </Box>
    </Grid>
  )
}

export default ShowcaseData;