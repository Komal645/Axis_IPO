import React from 'react'
import DrawerAppBar from './Components/DrawerAppBar'
import ImgBox from './Components/ImgBox'
import TabsComponent from './Components/TabsComponents'
// import Footer from '../Home Page/Footer.js'
import Banner from './Components/Banner'
import LatestNews from './Components/LatestNews'
import { Box, Typography } from '@mui/material'
import Footer from './Components/Footer'
import Card from '../Merchant Dashboard/NewsPage/Card'

const MerchantDashboard = () => {
  return (
    <div>
    <DrawerAppBar />
    <ImgBox />
    <TabsComponent />
    <Banner />
    <LatestNews />
    {/* <Card /> */}
    
    
    <Footer />
    <Box sx={{width:'100%', height:30, bgcolor:'#8a8586', textAlign:'center', justifyContent:'space-around'}} ><Typography>Copyright 2024 Axis Bank</Typography></Box>
      
    </div>
  )
}

export default MerchantDashboard
