import { Grid } from '@mui/material';

const ServiceIntro = ({icon, title, description}) => {
  return (
    <Grid item xs={3}>
        <div className="text-[45px] text-black">
          {icon}
        </div>
        <div className="flex xl:justify-center">
            <div className="ml-4 mt-2 font-Italiana">
            <h5 className="mb-1 text-2xl font-bold">{title}</h5>
            <p className="text-sm opacity-70 font-semibold font-Opensans">{description}</p>
            </div>
        </div>
    </Grid>
  )
}

export default ServiceIntro;