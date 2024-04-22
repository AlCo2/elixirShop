import { Alert, Box, Container, Grid } from "@mui/material";
import { IoIosTime } from "react-icons/io";
import { LiaMoneyBillSolid, LiaShippingFastSolid } from "react-icons/lia";
import IntroCard from "./components/IntroCard";
import ServiceIntro from "./components/home/ServiceIntro";
import { usePage } from "@inertiajs/react";
import Layout from "@/Layout";

export default function Home({featured, bestsellers, latest}) { 
  const { flash } = usePage().props;
  return (
    <>
      <Container>
        {flash.success && 
          <Alert severity="success" sx={{mt:2}}>{flash.success}</Alert>
        }
        {flash.error && 
          <Alert severity="success">{flash.error}</Alert>
        }
        <Grid container columns={{xs:6,md:12}} className="mt-10">
          <Grid item alignContent={'center'} xs={12} md={6}>
            <h1 className="my-3 font-Poppins font-bold text-4xl max-xs:text-xl text-center"><span className="text-liliana-primary">Bienvenue sur la boutique</span><br /> en ligne <span className="text-liliana-secondary">Liliana Shop</span></h1>
          </Grid>
          <Grid item  marginBottom={2} xs={12} md={6}>
            <Box display={'flex'} justifyContent={'center'}>
              <img src="assets/7.png"  alt="" />
            </Box>
          </Grid>
        </Grid>
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
        <div className="text-center mt-11 bg-liliana-secondary rounded-md py-2">
          <h1 className="text-5xl font-Opensans max-xs:text-3xl text-white">Featured</h1>
          <p className="font-Opensans text-white">See Our Most featured Products</p>
        </div>
        <Grid container justifyContent={'center'} rowGap={2} columnGap={5} className="my-10">
          {featured.length>1?
            featured.map((product)=>(
            <IntroCard key={product.id} title={product.title} image={product.image} price={product.price}/>
          ))
          :
          <>There is no products Available</>
          }
        </Grid>
        <div className="text-center mt-10 bg-liliana-secondary rounded-md py-2">
          <h1 className="text-5xl font-Opensans max-xs:text-3xl text-white">Bestsellers</h1>
          <p className="font-Opensans text-white">See Best Selling Products</p>
        </div>
        <Grid container justifyContent={'center'} rowGap={2} columnGap={5} className="my-10">
          {bestsellers.length>1?
            bestsellers.map((product)=>(
            <IntroCard key={product.id} title={product.title} image={product.image} price={product.price}/>
          ))
          :
          <>There is no products Available</>
          }
        </Grid>
        <div className="text-center mt-10 bg-liliana-secondary rounded-md py-2">
          <h1 className="text-5xl font-Opensans max-xs:text-3xl text-white">Latest Products</h1>
          <p className="font-Opensans text-white">See new Products</p>
        </div>
        <Grid container justifyContent={'center'} rowGap={2} columnGap={5} className="my-10">
          {latest.length>1?
            latest.map((product)=>(
            <IntroCard key={product.id} title={product.title} image={product.image} price={product.price}/>
          ))
          :
          <>There is no products Available</>
          }
        </Grid>
      </Container>
    </>
  );
}

Home.layout = page => <Layout children={page} title="Home" />