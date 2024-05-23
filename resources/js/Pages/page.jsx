import { Alert, Box, Button, Container, Divider, Grid } from "@mui/material";
import { IoIosTime } from "react-icons/io";
import { LiaMoneyBillSolid, LiaShippingFastSolid } from "react-icons/lia";
import IntroCard from "./components/IntroCard";
import ServiceIntro from "./components/home/ServiceIntro";
import { usePage } from "@inertiajs/react";
import Layout from "@/Layout";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { FiBox } from "react-icons/fi";
import { MdOutlineLocalShipping } from "react-icons/md";

const SectionBanner = ({title, text}) =>{
  return (
    <div className="text-center mt-11 rounded-md py-2 mx-4 text-black">
      <h1 className="text-5xl font-Italiana font-bold max-sm:text-4xl max-xs:text-3xl">{title}</h1>
      <div className="flex justify-center text-center">
        <p className="font-Opensans w-80">{text}</p>
      </div>
    </div>
  )
}

export default function Home({promotions, featured, bestsellers, latest}) { 
  const { flash } = usePage().props;
  return (
    <>
      <Container>
        {flash.success && 
          <Alert severity="success" sx={{mt:2}}>{flash.success}</Alert>
        }
        {flash.error && 
          <Alert severity="error" sx={{mt:2}}>{flash.error}</Alert>
        }
      </Container>
      <Grid className="py-5" container columns={{xs:6,md:12}}>
          <Grid item alignContent={'center'} xs={12} md={6}>
            <Container sx={{ml:{md:10}}}>
              <Box sx={{display:'flex', alignItems:'center', justifyContent:{sm:'center',md:'left'}, my:4}}>
                <h1 className="my-3 font-Italiana font-bold text-5xl max-xs:text-xl text-black">Welcome to the Liliana Shop online store</h1>
              </Box>
              <Box sx={{display:'flex',gap:5, alignItems:'center', justifyContent:{sm:'center',md:'left'}, my:4}}>
                <Box>
                  <p className="font-Poppins font-bold mb-1">220+</p>
                  <p className="font-Poppins opacity-60 font-semibold text-sm">Total Products</p>
                </Box>
                <Box>
                  <p className="font-Poppins font-bold mb-1">2+</p>
                  <p className="font-Poppins opacity-60 font-semibold text-sm">Years on the market</p>
                </Box>
              </Box>
              <Box sx={{display:'flex', alignItems:'center', justifyContent:{sm:'center',md:'left'}, my:4}}>
                <Button variant="contained" href="/store" color="liliana_dark" size="large" sx={{borderRadius:1, fontFamily:'Poppins'}}>Shop Now</Button>
              </Box>
            </Container>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display={'flex'} justifyContent={'center'}>
              <img src="/assets/intro.png" width={450} alt="" />
            </Box>
          </Grid>
        </Grid>
        <Grid container columns={{xs:3.5, sm:8,md:12}} justifyContent={'center'} gap={6} marginTop={5}>
          <ServiceIntro icon={<IoCheckmarkCircleOutline/>} title='Original Authentie' 
            description='it is our policy to provide original authentic fragrances to our costumers and community'
          />
          <Divider sx={{display:{xs:'none', md:'flex'}}} orientation="vertical" variant="middle" flexItem />
          <ServiceIntro icon={<FiBox/>} title='Brand New Product' 
            description='We will not provide any second fragrances all our fragrances are sent directly from the companies'
          />
          <Divider sx={{display:{xs:'none', md:'flex'}}} orientation="vertical" variant="middle" flexItem />
          <ServiceIntro icon={<MdOutlineLocalShipping/>} title='Fast Shipping' 
            description='You have the right to use our fragrances as fast as possible and we will make sure you have your right'
          />
        </Grid>
        <SectionBanner title={"Recommendation"} text={"These fragrances are the best selling ones. it is designed precisly by the designers."}/>
        <Grid container justifyContent={'center'} rowGap={2} columnGap={1} className="my-10">
          {promotions.length>0?
            promotions.map((product)=>(
            <IntroCard key={product.id} product={product}/>
          ))
          :
          <>There is no products Available</>
          }
        </Grid>
        <SectionBanner title={'Partners'} text={'These are the brands that believe and support us'} />
        <div className="flex items-center justify-center my-5">
          <div className="flex flex-wrap w-96 gap-5 justify-center items-center">
            <div>
              <img src="/brands/chanel.png" width={80} alt="chanel" />
            </div>
            <div>
              <img src="/brands/creed.png" width={80} alt="chanel" />
            </div>
            <div>
              <img src="/brands/Dolce-Gabbana-Logo.png" width={80} alt="chanel" />
            </div>
            <div>
              <img src="/brands/guess.webp" width={80} alt="chanel" />
            </div>
            <div>
              <img src="/brands/ysl.png" width={80} alt="chanel" />
            </div>
            <div>
              <img src="/brands/versace.png" width={50} alt="chanel" />
            </div>
            <div>
              <img src="/brands/dior-logo.png" width={50} alt="chanel" />
            </div>
            <div>
              <img src="/brands/bosss.webp" width={50} alt="chanel" />
            </div>
          </div>
        </div>
    </>
  );
}

Home.layout = page => <Layout children={page} title="Home" />