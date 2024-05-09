import { Alert, Box, Button, Container, Grid } from "@mui/material";
import { IoIosTime } from "react-icons/io";
import { LiaMoneyBillSolid, LiaShippingFastSolid } from "react-icons/lia";
import IntroCard from "./components/IntroCard";
import ServiceIntro from "./components/home/ServiceIntro";
import { usePage } from "@inertiajs/react";
import Layout from "@/Layout";
import DiscountCard from "./components/DiscountCard";

const SectionBanner = ({title, text}) =>{
  return (
    <div className="text-center mt-11 bg-liliana-secondary rounded-md py-2 mx-4">
      <h1 className="text-5xl font-Opensans max-xs:text-3xl text-white">{title}</h1>
      <p className="font-Opensans text-white">{text}</p>
    </div>
  )
}

export default function Home({promotions, featured, bestsellers, latest}) { 
  const { flash } = usePage().props;
  console.log(promotions);
  return (
    <>
      <Container>
        {flash.success && 
          <Alert severity="success" sx={{mt:2}}>{flash.success}</Alert>
        }
        {flash.error && 
          <Alert severity="error">{flash.error}</Alert>
        }
      </Container>
      <Grid container columns={{xs:6,md:12}}>
          <Grid item alignContent={'center'} xs={12} md={6}>
            <Container sx={{ml:{md:10}}}>
              <Box sx={{display:'flex', alignItems:'center', justifyContent:{sm:'center',md:'left'}, my:4}}>
                <h1 className="my-3 font-Poppins font-bold text-4xl max-xs:text-xl"><span className="text-liliana-primary">Bienvenue sur la boutique</span><br /> en ligne <span className="text-liliana-secondary">Liliana Shop</span></h1>
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
                <Button variant="contained" href="/store" color="liliana_primary" size="large" sx={{borderRadius:0}}>Shop Now</Button>
              </Box>
            </Container>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display={'flex'} justifyContent={'center'}>
              <img src="assets/myedit.png" alt="" />
            </Box>
          </Grid>
        </Grid>
        <svg id="wave" className="rotate-0 duration-300 max-sm:hidden" viewBox="0 100 1440 200" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0"><stop stopColor="rgba(250, 59, 193.067, 1)" offset="0%"></stop><stop stopColor="rgba(250, 59, 126, 1)" offset="100%"></stop></linearGradient></defs><path className="opacity-100 translate-x-0 translate-y-0" fill="url(#sw-gradient-0)" d="M0,196L80,179.7C160,163,320,131,480,114.3C640,98,800,98,960,114.3C1120,131,1280,163,1440,187.8C1600,212,1760,229,1920,228.7C2080,229,2240,212,2400,245C2560,278,2720,359,2880,343C3040,327,3200,212,3360,212.3C3520,212,3680,327,3840,383.8C4000,441,4160,441,4320,441C4480,441,4640,441,4800,432.8C4960,425,5120,408,5280,367.5C5440,327,5600,261,5760,196C5920,131,6080,65,6240,65.3C6400,65,6560,131,6720,171.5C6880,212,7040,229,7200,245C7360,261,7520,278,7680,269.5C7840,261,8000,229,8160,253.2C8320,278,8480,359,8640,343C8800,327,8960,212,9120,155.2C9280,98,9440,98,9600,89.8C9760,82,9920,65,10080,57.2C10240,49,10400,49,10560,49C10720,49,10880,49,11040,106.2C11200,163,11360,278,11440,334.8L11520,392L11520,490L11440,490C11360,490,11200,490,11040,490C10880,490,10720,490,10560,490C10400,490,10240,490,10080,490C9920,490,9760,490,9600,490C9440,490,9280,490,9120,490C8960,490,8800,490,8640,490C8480,490,8320,490,8160,490C8000,490,7840,490,7680,490C7520,490,7360,490,7200,490C7040,490,6880,490,6720,490C6560,490,6400,490,6240,490C6080,490,5920,490,5760,490C5600,490,5440,490,5280,490C5120,490,4960,490,4800,490C4640,490,4480,490,4320,490C4160,490,4000,490,3840,490C3680,490,3520,490,3360,490C3200,490,3040,490,2880,490C2720,490,2560,490,2400,490C2240,490,2080,490,1920,490C1760,490,1600,490,1440,490C1280,490,1120,490,960,490C800,490,640,490,480,490C320,490,160,490,80,490L0,490Z"></path></svg>
        <Container>
        <Grid container columns={{xs:3.5, sm:8,md:12}} justifyContent={'center'} gap={6} marginTop={5}>
          <ServiceIntro icon={<LiaShippingFastSolid/>} title='Livraison gratuite' 
            description='Les Frais de livraison sont gratuits à partir de 5 articles'
          />
          <ServiceIntro icon={<LiaMoneyBillSolid/>} title='Paiement facile' 
            description='Paiement à la livraison'
          />
          <ServiceIntro icon={<IoIosTime/>} title='Livraison super rapide' 
            description='Entre 24 et 48 heurs'
          />
        </Grid>
        <div className="h-1 bg-liliana-primary rounded-md my-10"></div>
        <Grid container mt={2}>
          <Grid item sm={12} md={5}>
            <p className="font-Poppins font-medium text-3xl">New Style for Latest <br /> Collections</p>
          </Grid>
          <Grid item xs={12} sm >
            <p className="opacity-70 text-sm font-Poppins">Discover our latest collection of clothing, shoes, and accessoires that are perfect for any occasion. From casual wear to formal attire. we have everything you need to revamp your wardrobe and stay on trend.</p>
          </Grid>
        </Grid>
        <Grid container mt={1} mb={4} gap={1} sx={{justifyContent:'space-between'}}>
          <Grid item xs>
            <Grid container sx={{backgroundColor:'#f6f6f6', minHeight:'100%', p:4, position:'relative'}}>
              <p className="absolute -rotate-90 right-5 top-1 bg-liliana-primary p-2 rounded-s-xl text-white">NEW</p>
              <Grid item xs={12} sm>
                <p className="font-Opensans font-medium text-5xl mb-4">NEW<br/>RUNNING<br/>STYLE</p>
                <p className="font-Opensans font-medium mb-4">NOW AVAILABLE</p>
                <Button variant="contained" color="liliana_third" sx={{borderRadius:10}} className="text-xs">Check Now</Button>
              </Grid>
              <Grid item xs={12} sm>
                <img className="min-w-52 max-w-64" src="https://static.vecteezy.com/system/resources/previews/022/917/713/non_2x/watercolor-perfume-isolated-free-png.png" alt=""/>
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={12} md={4} item>
            <Grid container mb={1}>
              <Grid item xs={12} sx={{backgroundColor:'#f6f6f6', p:2, height:'100%'}}>
                <Grid container>
                  <Grid item xs={12} sm >
                    <p className="font-Opensans font-semibold text-2xl mb-4 uppercase text-yellow-300">Adorned<br />in gold</p>
                    <p className="font-Opensans font-medium mb-4">MOVE AND EXPLORE</p>
                  </Grid>
                  <Grid item xs={12} sm>
                    <img className="min-w-36" src="https://static.vecteezy.com/system/resources/previews/023/337/987/non_2x/ai-generative-glass-perfume-bottle-illustration-free-png.png" alt="" />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} sx={{backgroundColor:'#fa3b7e', color:'white',p:2, height:'100%'}}>
                <Grid container>
                  <Grid item xs={12} sm >
                    <p className="font-Opensans font-medium text-2xl mb-4">GET<br />$15 OFF</p>
                    <p className="font-Opensans font-medium mb-4 text-xs">For all item in our store or website</p>
                  </Grid>
                  <Grid item xs={12} sm>
                    <img className="min-w-36" src="" alt="" />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        </Container>
        <SectionBanner title={"Promotions"} text={"Our Best Offers"}/>
        <Grid container justifyContent={'center'} rowGap={2} columnGap={5} className="my-10">
          {promotions.length>0?
            promotions.map((promotion)=>(
            <DiscountCard key={promotion.id} id={promotion.product.id} title={promotion.product.title} image={promotion.product.images[0]?promotion.product.images[0].url:null} price={promotion.product.price} discountPrice={promotion.promotion_price}/>
          ))
          :
          <>There is no products Available</>
          }
        </Grid>
        <SectionBanner title={"Featured"} text={"See Our Most featured Products"}/>
        <Grid container justifyContent={'center'} rowGap={2} columnGap={5} className="my-10">
          {featured.length>0?
            featured.map((product)=>(
            <IntroCard key={product.id} id={product.id} title={product.title} image={product.images[0]?product.images[0].url:null} price={product.price}/>
          ))
          :
          <>There is no products Available</>
          }
        </Grid>
        <SectionBanner title={"Bestsellers"} text={"See Best Selling Products"} />
        <Grid container justifyContent={'center'} rowGap={2} columnGap={5} className="my-10">
          {bestsellers.length>0?
            bestsellers.map((product)=>(
            <IntroCard key={product.id} id={product.id} title={product.title} price={product.price}/>
          ))
          :
          <>There is no products Available</>
          }
        </Grid>
        <SectionBanner title={"Latest Products"} text={"See new Products"} />
        <Grid container justifyContent={'center'} rowGap={2} columnGap={5} className="my-10">
          {latest.length>0?
            latest.map((product)=>(
            <IntroCard key={product.id} id={product.id} title={product.title} image={product.images[0]?product.images[0].url:null} price={product.price}/>
          ))
          :
          <>There is no products Available</>
          }
        </Grid>
    </>
  );
}

Home.layout = page => <Layout children={page} title="Home" />