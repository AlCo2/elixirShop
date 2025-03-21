import { Alert, Box, Button, Container, Divider, Grid } from "@mui/material";
import { usePage } from "@inertiajs/react";
import Layout from "@/Layout";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { FiBox } from "react-icons/fi";
import { MdOutlineLocalShipping } from "react-icons/md";
import ServiceIntro from "@/Components/ServiceIntro";
import IntroCard from "@/Components/IntroCard";
import SectionBanner from "@/Components/SectionBanner";

export default function Home({promotions, favourites}) { 
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
                <h1 className="my-3 font-Italiana font-bold text-5xl max-xs:text-xl text-black">Welcome to Elixir Shop online store</h1>
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
              <img src="/assets/intro.webp" width={450} alt="" />
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
            <IntroCard key={product.id} product={product} favourites={favourites}/>
          ))
          :
          <p>There is no products Available</p>
          }
        </Grid>
        <SectionBanner title={'Partners'} text={'These are the brands that believe and support us'} />
        <div className="flex items-center justify-center my-5">
          <div className="flex flex-wrap w-96 gap-5 justify-center items-center">
            <div>
              <img src="/brands/chanel.png" width={80} height={80} alt="chanel" />
            </div>
            <div>
              <img src="/brands/creed.png" width={80} height={80} alt="creed" />
            </div>
            <div>
              <img src="/brands/Dolce-Gabbana-Logo.png" width={80} height={80} alt="dolce-gabbana" />
            </div>
            <div>
              <img src="/brands/guess.webp" width={80} height={80} alt="guess" />
            </div>
            <div>
              <img src="/brands/ysl.png" width={80} height={80} alt="ysl" />
            </div>
            <div>
              <img src="/brands/versace.png" width={80} height={80} alt="versace" />
            </div>
            <div>
              <img src="/brands/dior-logo.png" width={80} height={80} alt="dior" />
            </div>
            <div>
              <img src="/brands/bosss.webp" width={80} height={80} alt="boss" />
            </div>
          </div>
        </div>
    </>
  );
}

Home.layout = page => <Layout children={page} title="Home" />