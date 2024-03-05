// App.js
import React from 'react';

import MerchantDashboard from './Components/Merchant Dashboard/MerchantDashboard';
import NewsPage from './Components/Merchant Dashboard/NewsPage/NewsPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmployeeDashboard from './Components/Employee Dashboard/EmployeeDashboard';
import HomePageLayout from './Components/Home Page/HomePage';
import TandC from './Components/Home Page/TandC';
import Login from './Components/Login/Login';
import ForgotPassword from './Components/Login/ForgotPassword';
import VerifyOtp from './Components/Login/VerifyOtp';
import ResetPassword from './Components/Login/ResetPassword';
import Registration from './Components/Login/Registration';
import Logout from './Components/Merchant Dashboard/Components/Logout';
import MerchantPrivateRoute, { AdminPrivateRoute } from './Components/Private Routes/PrivateRoutes';
import NotFound from './Components/Home Page/NotFound';



const App = () => {
  return (
    <>
    <BrowserRouter> 
      <Routes>
      <Route path='/' element={<HomePageLayout/>} />
      <Route path="/TandC" element={<TandC />} />

      <Route path="/register" element={<Registration />} />
      <Route path="/login" element={<Login />} />
          {/* <Route path="/investor/Register" element={<InvestorRegistration />} /> */}
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/sent-otp" element={<VerifyOtp />} />
      <Route path="/verify-otp" element={<ResetPassword />} />
      
      <Route path="/merchant/*" element={<MerchantPrivateRoute />}>
        <Route path="dashboard" element={<MerchantDashboard />} />
        <Route path="blog" element={<NewsPage />} />
        </Route>

        <Route path="/admin/*" element={<AdminPrivateRoute />}>
        <Route path="dashboard" element={<EmployeeDashboard />} />
        </Route>
        
        <Route path="/logout" element={<Logout />} />
        <Route path="/*" element={<NotFound />} />





        
      </Routes>
    </BrowserRouter>
  </>

  );
};

export default App;
