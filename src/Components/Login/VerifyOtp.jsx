import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Stack, Box } from '@mui/material';

const VerifyOtp = () => {
  const baseUrl = 'http://localhost:9901/merchant/verifyForgotPassword';
  const navigate = useNavigate();
  const [enteredEmail, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [enteredOTP, setOtp] = useState('');

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  
  const otpChangeHandler = (event) => {
    setOtp(event.target.value);
  };

  const submitActionHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`${baseUrl}?email=${enteredEmail}&otp=${enteredOTP}`);

      if (response.status === 200) {
        setMessage('OTP sent to your email successfully!');
      } else {
        setMessage('Failed to send OTP. Please verify the entered email.');
      }
    } catch (error) {
      setMessage('Incorrect Otp please enter valid otp.');
    }
  };

  useEffect(() => {
    if (message === 'OTP sent to your email successfully!') {
      navigate('/verify-otp');
    }
  }, [message, navigate]);

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh', // Set to 100vh for full viewport height
      width:'100vw',
      bgcolor: '#97144d',
    }}>
    
    <Stack direction="column"
      alignItems="center"
      justifyContent="center"
      spacing={2}
      sx={{  width: '100vw', maxWidth: '300px', padding: '2rem', backgroundColor: 'white',  boxShadow:'10px', margin:'0rem' }}
    >
      <Typography variant="h5">Send OTP</Typography>
      <Stack direction="column" spacing={2}>
        <TextField
          label="Email"
          variant="outlined"
          value={enteredEmail}
          onChange={emailChangeHandler}
          placeholder="Enter your Email"
          required
        />
        <TextField
          label="OTP"
          variant="outlined"
          type="text"
          value={enteredOTP}
          onChange={otpChangeHandler}
          placeholder="Enter correct OTP"
          required
        />
        <Button variant="contained" onClick={submitActionHandler}>
          Verify OTP
        </Button>
        {message && <Typography>{message}</Typography>}
      </Stack>
    </Stack>
    </Box>
  );
};

export default VerifyOtp;
