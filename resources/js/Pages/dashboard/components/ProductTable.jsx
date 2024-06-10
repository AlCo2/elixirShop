import { Box, Button, Grid, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const TableCellDate = ({date}) =>{
    const createdAtDate = new Date(date);
    return(
      <TableCell sx={{fontFamily:'Poppins', fontWeight:500}} component="th" scope="row">
        {createdAtDate.getFullYear()+'/'+(createdAtDate.getMonth()+1)+'/'+createdAtDate.getDate()}
      </TableCell>
    )
  }

const ProductTable = ({products}) => {
  return (
        <Grid item xs sx={{borderRadius:4, bgcolor:'white', borderWidth:1, mb:1}} >
            <Box sx={{ p:2, display:'flex', justifyContent:'space-between' }}>
            <Box>
                <p className="font-Roboto font-semibold text-xl">Newest Product</p>
                <p className="text-xs opacity-70">Newest product list of the month</p>
            </Box>
            <Box>
                <Button href="/dashboard/product" variant="outlined" size="small" sx={{borderRadius:4, color:'black', borderColor:'black'}}>See More</Button>
            </Box>
            </Box>
            <Box sx={{overflowX:'auto'}}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{fontFamily:'Poppins',fontWeight:700}}>PRODUCT</TableCell>
                        <TableCell sx={{fontFamily:'Poppins',fontWeight:700}}>CATEGORY</TableCell>
                        <TableCell sx={{fontFamily:'Poppins',fontWeight:700}}>PRICE</TableCell>
                        <TableCell sx={{fontFamily:'Poppins',fontWeight:700}}>CREATED</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody> 
                {products.map((product)=>(
                    <TableRow
                        key={product.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                    <TableCell sx={{fontFamily:'Poppins', fontWeight:500}} component="th" scope="row">
                        {product.title}
                    </TableCell>
                    <TableCell sx={{fontFamily:'Poppins', fontWeight:500}} component="th" scope="row">
                        {product.category?product.category.name:''}
                    </TableCell>
                    <TableCell sx={{fontFamily:'Poppins', fontWeight:500}} component="th" scope="row">
                        {product.price}DH
                    </TableCell>
                    <TableCellDate date={product.created_at} />
                    </TableRow>
                    ))
                    }
            </TableBody>
            </Table>
            </Box>
        </Grid>
  )
}

export default ProductTable;