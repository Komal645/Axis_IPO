import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Stack, Box } from '@mui/material';
import { Link,useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const baseUrl = 'http://localhost:9901/merchant/forgotPassword';
  const navigate = useNavigate();
  const [enteredEmail, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const submitActionHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`${baseUrl}?email=${enteredEmail}`);

      if (response.status === 200) {
        setMessage('Password reset email sent successfully!');
      } else {
        setMessage('Failed to send reset email. User may not be registered.');
      }
    } catch (error) {
      setMessage('Please check your entered email.');
    }
  };

  useEffect(() => {
    if (message === 'Password reset email sent successfully!') {
      navigate('/sent-otp');
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
    }} >
    <Stack direction="column" alignItems="center" sx={{ width:350,height:350 , padding: '5rem 2rem 2rem 2rem', backgroundColor:'white', boxShadow:'10px'}}>
      <Typography variant="h5" gutterBottom>
        Forgot Password
      </Typography>
      <form onSubmit={submitActionHandler} style={{ width: '300px' }}>
        <Stack direction="column" spacing={2}>
          <TextField
            type="email"
            label="Email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            placeholder="Enter your Email"
            required
          />
          <Button variant="contained" type="submit">
            Send OTP
          </Button>
          {message && <Typography>{message}</Typography>}
        </Stack>
      </form>
    </Stack>
    </Box>
  );
};

export default ForgotPassword;
