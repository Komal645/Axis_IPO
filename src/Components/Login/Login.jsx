import { Typography, Button, TextField,Stack,IconButton, Box, Container  } from '@mui/material';
import React, { useState } from 'react';
// import jwt from 'jsonwebtoken';
import { decodeToken } from 'react-jwt';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';


const Login = () => {
  const baseUrl = `http://localhost:9901/merchant/authenticate`;
  const navigate = useNavigate();
  const [enteredUsername, setUsername] = useState('');
  const [enteredPassword, setPassword] = useState('');

  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const [showPassword, setShowPassword] = useState(false);
 
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const validatePassword = (value) => {
    const passwordPattern = /^(?=.*[A-Z])(?=.#)(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/;
    return passwordPattern.test(value);
  };
  const [errors, setErrors] = useState({});


  const headers = {
    'Content-Type':'application/json',
  };

  const verifyToken = (token) => {
    try {
      const decoded = decodeToken(token);
      // const decoded = jwt.verify(token, secretKey);
      return decoded;
    } catch (error) {
      console.error('Error verifying token:', error);
      return null;
    }
  };

  // const submitActionHandler = (event) => {
  //   event.preventDefault();
  //   const validationErrors = {};

  //   if (!validatePassword(enteredPassword)) {
  //     validationErrors.password = 'Password must contain at least 1 uppercase letter, 1 special character, 1 digit, and be at least 8 characters long.';
  //     setErrors(validationErrors);
  //     return;
  //   }
  
  //  axios.post(baseUrl,{
  //   username:enteredUsername,
  //   password:enteredPassword,
  //  },{
  //   headers:headers,
  //  })
  //  .then((response)=>{
  //   const token = response.data.token;
  //   localStorage.setItem('token',token);
  //   const retrievedToken=localStorage.getItem('token');
  //   const verifiedToken = verifyToken(retrievedToken);

  //   if(verifiedToken)
  //   {
  //     //const decodedToken = decodeToken(retrievedToken);
     
  //     headers['Authorization']=`Bearer ${retrievedToken}`;
  //     console.log('Token is present in localStorage:',retrievedToken);
  //      //console.log('Decoded token:', decodedToken);
  //   }
  //   else 
  //   {
  //     console.log('Token not found in localStorage');
  //   }
  //   alert("Login Successful!");
  //   if (verifiedToken.roles.includes('ROLE_Customer')) {

  //         navigate('/user/dashboard');
  //   }
  //   else if (verifiedToken.roles.includes('ROLE_Investor')) {
  //     navigate('/investor/dashboard');
  //   }
  //   else if (verifiedToken.roles.includes('ROLE_Admin')) {
  //     navigate('/admin/dashboard');
  //   }

  //  }).catch(error=>{
  //   alert("Incorrect Username or Password!");
  //  });
  // };









  const handleLoginSuccess = (token) => {
    localStorage.setItem('token', token);
    const decodedToken = decodeToken(token);
  
    if (decodedToken) {
      // Log the decoded token for debugging
      console.log('Decoded Token:', decodedToken);
  
      if (decodedToken.roles.includes('ROLE_MERCHANT')) {
        navigate('/merchant/dashboard');
      } 
       else if (decodedToken.roles.includes('ROLE_ADMIN')) {
        navigate('/admin/dashboard');
      }
    } else {
      console.error('Failed to decode token.');
      // Handle the case where token decoding fails
    }
  };
  
  const submitActionHandler = (event) => {
    event.preventDefault();
    const validationErrors = {};
  
    // Perform validation checks and set errors if needed
  
    axios.post(baseUrl, {
        username: enteredUsername,
        password: enteredPassword,
      }, {
        headers: headers,
      })
      .then((response) => {
        // Assuming the token is directly present in the response data
        const token = response.data.token;
        if(token){
        
        // Handle successful login
        alert("Login Successful!");
        handleLoginSuccess(token);
        }else{alert("Account Not Approved Yet")}
      })
      .catch((error) => {
        // Handle login failure
        alert("Incorrect Username or Password!");
      });
  };
  

















  return (
    <Box  sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh', // Set to 100vh for full viewport height
      width:'100vw',
      bgcolor: '#97144d',
      // boxShadow:5
    }} >
    
    <Stack
    
      direction="column"
      alignItems="center"
      justifyContent="center"
      spacing={2}
      sx={{  width: '100vw', maxWidth: '350px', padding: '2rem', backgroundColor: 'white',  boxShadow:'10px', margin:'0rem' }}
    >
      <Typography variant="h4" component="h1">
        Login Form
      </Typography>
    
        <Stack direction="column" spacing={2}>
          <TextField
            label="Username"
            variant="outlined"
            name="username"
            value={enteredUsername}
            onChange={usernameChangeHandler}
            required
          />
       
       <TextField
        type={showPassword ? 'text' : 'password'}
        label="Password *"
        name="password"
        value={enteredPassword}
        onChange={passwordChangeHandler}
        required
        margin="normal"
        error={!!errors.password}
        helperText={errors.password}
        InputProps={{
          endAdornment: (
            <IconButton style={{ cursor: 'pointer' }} onClick={togglePasswordVisibility}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          ),
        }}
      />
          <Button variant="contained" type="submit" onClick={submitActionHandler}>
            Login
          </Button>
          <Link to="/forgot-password">Forgot Password?</Link>
          <Typography variant="body1" component="p">
          Don't have an account? <Link to="/register">Sign up</Link>
          </Typography>
        </Stack>
      
    </Stack>
    </Box>
  );
};

export default Login;