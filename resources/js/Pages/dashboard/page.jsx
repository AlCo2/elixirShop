import { Box, Button, Grid, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { SparkLineChart } from "@mui/x-charts";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Bar, BarChart, Text, Tooltip, XAxis, YAxis } from "recharts";

const data = [ 
  {name:'Jan', data:3200},
  {name:'Feb', data:1600},
  {name:'Mar', data:1300},
  {name:'Avr', data:2600},
  {name:'May', data:955},
  {name:'Jun', data:3432},
  {name:'Jul', data:2343},
]

const page = () => {
  return (
    <div>
      <Box sx={{p:2}}>
        <p className="font-Opensans font-semibold text-2xl">Overview</p>
        <p className="text-sm opacity-70">Get up-to-the-minute insight. No more waiting for reports</p>
      </Box>
      <Box>
        <Grid container>
          <Grid xs={7} item>
            <Box>
              <Grid container gap={2} p={2}>
                <Grid xs={5.8} sx={{borderRadius:2, bgcolor:'white', borderWidth:1}} item>
                  <Box sx={{p:2}}>
                    <p className="font-Roboto font-semibold text-xl">Total Product Viewed</p>
                    <p className="text-xs opacity-70">Customre have visited and clicked product</p>
                  </Box>
                  <Box sx={{pl:2, display:'flex', alignItems:'center'}}>
                    <Box sx={{ display:'flex', flexDirection:'column', justifyContent:'space-between', height:70}}>
                      <Typography sx={{color:'#7c62ff', fontSize:'1.875rem', lineHeight:'2.25rem', fontWeight:700, fontFamily:'Poppins'}}>6.003</Typography>
                      <p className="text-sm font-Poppins"><span className="text-green-500">1K+</span> <span className="text-xs opacity-70">Increase</span></p>
                    </Box>
                    <SparkLineChart area colors={['#7c62ff']} curve="natural" data={[7, 10, 8, 12, 10, 14, 13]} width={100} height={70} showHighlight showTooltip/>
                  </Box>
                </Grid>
                <Grid xs={5.8} sx={{borderRadius:2, bgcolor:'white', borderWidth:1}} item>
                  <Box sx={{p:2}}>
                    <p className="font-Roboto font-semibold text-xl">Total Sales</p>
                    <p className="text-xs opacity-70">Product have been saled</p>
                  </Box>
                  <Box sx={{pl:2, display:'flex', alignItems:'center'}}>
                    <Box sx={{ display:'flex', flexDirection:'column', justifyContent:'space-between', height:70}}>
                      <Typography sx={{color:'#7c62ff', fontSize:'1.875rem', lineHeight:'2.25rem', fontWeight:700, fontFamily:'Poppins'}}>2334DH</Typography>
                      <p className="text-sm font-Poppins"><span className="text-green-500">2K+</span> <span className="text-xs opacity-70">Increase</span></p>
                    </Box>
                    <SparkLineChart area colors={['#7c62ff']} curve="natural" data={[10, 9, 8, 7, 9, 12, 11, 10, 7, 6, 7, 8, 9, 10, 12, 6]} width={100} height={70} showTooltip showHighlight/>
                  </Box>
                </Grid>
                <Grid item xs={12} sx={{borderRadius:2, bgcolor:'white', borderWidth:1}} >
                  <Box sx={{ p:2, display:'flex', justifyContent:'space-between' }}>
                    <Box>
                      <p className="font-Roboto font-semibold text-xl">Newest Product</p>
                      <p className="text-xs opacity-70">Newest product list of the month</p>
                    </Box>
                    <Box>
                      <Button variant="outlined" size="small" sx={{borderRadius:4, color:'black', borderColor:'black'}}>See More</Button>
                    </Box>
                  </Box>
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
                      <TableRow
                        key={1}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell sx={{fontFamily:'Poppins', fontWeight:500}} component="th" scope="row">
                          Headphone 8 pro
                        </TableCell>
                        <TableCell sx={{fontFamily:'Poppins', fontWeight:500}} component="th" scope="row">
                          later
                        </TableCell>
                        <TableCell sx={{fontFamily:'Poppins', fontWeight:500}} component="th" scope="row">
                          35DH
                        </TableCell>
                        <TableCell sx={{fontFamily:'Poppins', fontWeight:500}} component="th" scope="row">
                          Feb 2, 2019 19:28
                        </TableCell>
                      </TableRow>
                      <TableRow
                        key={2}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell sx={{fontFamily:'Poppins', fontWeight:500}} component="th" scope="row">
                          Headphone 8 pro
                        </TableCell>
                        <TableCell sx={{fontFamily:'Poppins', fontWeight:500}} component="th" scope="row">
                          later
                        </TableCell>
                        <TableCell sx={{fontFamily:'Poppins', fontWeight:500}} component="th" scope="row">
                          35DH
                        </TableCell>
                        <TableCell sx={{fontFamily:'Poppins', fontWeight:500}} component="th" scope="row">
                          Feb 2, 2019 19:28
                        </TableCell>
                      </TableRow>
                      <TableRow
                        key={3}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell sx={{fontFamily:'Poppins', fontWeight:500}} component="th" scope="row">
                          Headphone 8 pro
                        </TableCell>
                        <TableCell sx={{fontFamily:'Poppins', fontWeight:500}} component="th" scope="row">
                          later
                        </TableCell>
                        <TableCell sx={{fontFamily:'Poppins', fontWeight:500}} component="th" scope="row">
                          35DH
                        </TableCell>
                        <TableCell sx={{fontFamily:'Poppins', fontWeight:500}} component="th" scope="row">
                          Feb 2, 2019 19:28
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid xs={4} m={2} ml={0} sx={{borderRadius:2}} item>
            <Box sx={{bgcolor:'white', height:280, borderWidth:1, mb:2, borderRadius:4}}>
              <Box sx={{p:2, display:'flex', alignItems:'center', justifyContent:'space-between'}} >
                <Box>
                  <p className="font-Roboto font-semibold text-xl">Balance</p>
                  <p className="text-xs opacity-70">amount of income and results</p>
                </Box>
                <Box>
                  <Button variant="outlined" sx={{borderRadius:4, color:'black', borderColor:'black'}} size="small">See detail</Button>
                </Box>
              </Box>
              <Box sx={{px:2, display:'flex', flexDirection:'column'}}>
                <Box sx={{ display:'flex', flexDirection:'column', justifyContent:'space-between', height:70}}>
                  <Typography sx={{color:'#7c62ff', fontSize:'1.875rem', lineHeight:'2.25rem', fontWeight:700, fontFamily:'Poppins'}}>6171DH</Typography>
                  <p className="text-sm font-Poppins"><span className="text-green-500">7K+</span> <span className="text-xs opacity-70">Increase</span></p>
                </Box>
                <BarChart width={317} height={130} data={data}>
                  <XAxis dataKey='name' axisLine={false} tickLine={false} className="font-Poppins text-sm" />
                  <Bar dataKey="data" fill="#7c62ff" radius={10}/>
                </BarChart>
              </Box>
            </Box>
            <Box sx={{bgcolor:'white', height:250, borderWidth:1, borderRadius:4}}>
              <Box sx={{p:2, display:'flex', alignItems:'center', justifyContent:'space-between'}} >
                <Box>
                  <p className="font-Roboto font-semibold text-xl">Audience</p>
                  <p className="text-xs opacity-70">Customers have visited website</p>
                </Box>
                <Box>
                  <IconButton size="small"><BsThreeDotsVertical/></IconButton>
                </Box>
              </Box>
              <Box sx={{px:2}}>
                {/* <BarChart
                  yAxis={[{ scaleType: 'band', data: ['Male', 'Female', 'Other']}]}
                  series={[{ data: [1345, 2122, 600], color:'#feca33' }]}
                  height={180}
                  layout="horizontal"
                  margin={{top:20, left:50, right:40, bottom:60}}
                /> */}
                <BarChart layout="vertical" width={300} height={130} data={[{name:'Male', view:1345},{name:'Female', view:2122},{name:'Other', view:635},]}>
                  <YAxis dataKey='name' type="category" axisLine={false} tickLine={false} className="font-Poppins text-sm" />
                  <XAxis type="number" axisLine={false} tickLine={false}/>
                  <Tooltip/>
                  <Bar dataKey="view" fill="#feca33" radius={8}/>
                </BarChart>
              </Box>
            </Box>
          </Grid>
        </Grid>        
      </Box>
    </div>
  )
}

export default page;