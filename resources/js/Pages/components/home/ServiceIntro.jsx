import { Grid } from '@mui/material';
import React from 'react'

const ServiceIntro = ({icon, title, description}) => {
  return (
    <Grid item xs={3.5}>
        <div className="flex xl:justify-center">
            <div className="text-[45px] text-liliana-primary">
                {icon}
            </div>
            <div className="ml-4 mt-2 font-Poppins">
            <h5 className="mb-1 text-2xl font-medium">{title}</h5>
            <p className="text-sm opacity-70">{description}</p>
            </div>
        </div>
    </Grid>
  )
}

export default ServiceIntro;