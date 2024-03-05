import React from 'react'
import ImgHeader from './Components/ImgHeader'
import { Box, Typography } from '@mui/material'
import Footer from '../Merchant Dashboard/Components/Footer'
import EmpTabsComponent from './Components/EmpTabComponents'
import DrawerAppBar from '../Merchant Dashboard/Components/DrawerAppBar'
import EmpDrawerAppBar from './Components/EmpDrawerAppBar'

const EmployeeDashboard = () => {
  return (
    <div>
    <EmpDrawerAppBar />
    <ImgHeader />
    <EmpTabsComponent />
    
    
    <Footer />
    <Box sx={{width:'100%', height:30, bgcolor:'#8a8586', textAlign:'center', justifyContent:'space-around'}} ><Typography>Copyright 2024 Axis Bank</Typography></Box>
      
    </div>
  )
}

export default EmployeeDashboard
