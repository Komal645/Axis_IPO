import React from 'react'
import { Box, Typography } from '@mui/material'
import DrawerAppBar from '../Components/DrawerAppBar'
import ImgBox from '../Components/ImgBox'
import Footer from '../Components/Footer'
import BlogList from './BlogCard'
import Hbox from './Hbox'
import MyCard from './Card'

const NewsPage = () => {
  return (
    <div>
    <DrawerAppBar />
    {/* <MyCard /> */}
    <Hbox />
    <BlogList/>
    
    
    <Footer />
    <Box sx={{width:'100%', height:30, bgcolor:'#8a8586', textAlign:'center', justifyContent:'space-around'}} ><Typography>Copyright 2024 Axis Bank</Typography></Box>
      
    </div>
  )
}

export default NewsPage
