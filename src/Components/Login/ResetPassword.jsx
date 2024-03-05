import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Stack, IconButton, Box } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';


const ResetPassword = () => {
  const baseUrl = 'http://localhost:9901/merchant/changePassword';
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [enteredEmail, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setNewPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const validatePassword = (value) => {
    const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/;
    return passwordPattern.test(value);
  };
  const [errors, setErrors] = useState({});


  const handleResetPassword = async (event) => {
    event.preventDefault();
    
     const validationErrors = {};

    if (!validatePassword(newPassword)) {
      validationErrors.password = 'Password must contain at least 1 uppercase letter, 1 special character, 1 digit, and be at least 8 characters long.';
      setErrors(validationErrors);
      return;
    }
  
  
    try {
      const response = await axios.put(baseUrl, {
        email: enteredEmail,
        newPassword: newPassword,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setMessage('Password reset successfully!');
      } else {
        setMessage('Failed to reset password. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred during password reset.');
    }
  };

  useEffect(() => {
    if (message === 'Password reset successfully!') {
      navigate('/login');
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
    
    <Stack direction="column"
      alignItems="center"
      justifyContent="center"
      spacing={2}
      sx={{  width: '100vw', maxWidth: '300px', padding: '2rem', backgroundColor: 'white',  boxShadow:'10px', margin:'0rem' }}
    >
      <Typography variant="h5">Reset Password</Typography>
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
        type={showPassword ? 'text' : 'password'}
        label="Password *"
        name="password"
        value={newPassword}
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
       
        <Button variant="contained" onClick={handleResetPassword}>
          Reset Password
        </Button>
        {message && <Typography>{message}</Typography>}
      </Stack>
    </Stack>
    </Box>
  );
};

export default ResetPassword;
