import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { decodeToken, useJwt } from 'react-jwt';

const isMerchantAuthenticated =()=>{
    const token = localStorage.getItem('token');
    const decodedToken = decodeToken(token);
  
    if (decodedToken && decodedToken.roles.includes('ROLE_MERCHANT')) {
      // Log the decoded token for debugging
      console.log('App js Decoded Token:', decodedToken);
  
      // if (decodedToken.roles.includes('ROLE_CUSTOMER')){
        return true;
    }
    else return false;
    
    
  }

  const MerchantPrivateRoute = (props)=>{
    const auth = isMerchantAuthenticated();
    return auth?<Outlet/> :<Navigate to='/login' />
  }

//   const isInvestorAuthenticated =()=>{
//     const token = localStorage.getItem('token');
//     const decodedToken = decodeToken(token);
  
//     if (decodedToken && decodedToken.roles.includes('ROLE_INVESTOR')) {
//       // Log the decoded token for debugging
//       console.log('App js Decoded Token:', decodedToken);
  
//       // if (decodedToken.roles.includes('ROLE_CUSTOMER')){
//         return true;
//     }
//     else return false;
    
    
//   }

//   const InvestorPrivateRoute = (props)=>{
//     const auth = isInvestorAuthenticated();
//     return auth?<Outlet /> :<Navigate to='/login' />
//   }


  const isAdminAuthenticated =()=>{
    const token = localStorage.getItem('token');
    const decodedToken = decodeToken(token);
  
    if (decodedToken && decodedToken.roles.includes('ROLE_ADMIN')) {
      // Log the decoded token for debugging
      console.log('App js Decoded Token:', decodedToken);
  
      // if (decodedToken.roles.includes('ROLE_CUSTOMER')){
        return true;
    }
    else return false;
    
    
  }

  const AdminPrivateRoute = (props)=>{
    const auth = isAdminAuthenticated();
    return auth?<Outlet /> :<Navigate to='/login' />
  }

// const PrivateRoute = ({ element, roles }) => {
//   const { decodedToken, isExpired } = useJwt();

//   if (!decodedToken || isExpired) {
//     // Redirect to the login page if the user is not authenticated or the token is expired
//     return <Navigate to="/login" />;
//   }

//   // Check if the user has the required roles
//   if (roles && roles.length > 0 && !roles.includes(decodedToken.role)) {
//     // Redirect to an unauthorized page if the user doesn't have the required roles
//     return <Navigate to="/unauthorized" />;
//   }

//   // Render the protected route
//   return <Route element={element} />;
// };

export {AdminPrivateRoute};

export default MerchantPrivateRoute;
