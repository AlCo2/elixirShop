import { Box, Container, Grid} from "@mui/material";
import DashboardLayout from "./DashboardLayout";
import ShowcaseData from "./components/ShowcaseData";
import ProductTable from "./components/ProductTable";
import ShowcaseDataBars from "./components/ShowcaseDataBars";

const page = ({products, total_products, total_sales, total_orders, products_overview, orders_overview}) => {
  return (
    <Container>
      <Box sx={{p:2}}>
        <p className="text-2xl font-Poppins font-semibold">Overview</p>
        <p className="text-sm opacity-70">Get up-to-the-minute insight. No more waiting for reports</p>
      </Box>
      <Box>
        <Grid gap={1} container sx={{justifyContent:'space-between'}}>
          <Grid xs item>
            <Box>
              <Grid gap={1} container sx={{justifyContent:'space-between'}}>
                <ShowcaseData title={"Total Product"} subTitle={"Customre have visited and clicked product"} total={total_products} data={products_overview}/>
                <ShowcaseData title={"Total Orders"} subTitle={"Amount of orders and results"} total={total_orders} data={orders_overview}/>
                <ProductTable products={products}/>
              </Grid>
            </Box>
          </Grid>
          <ShowcaseDataBars total_sales={total_sales}/>
        </Grid>
      </Box>
    </Container>
  )
}

page.layout = page => <DashboardLayout children={page} tite="overview" />
export default page;