import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import axios from 'axios';

const FeedForm = () => {

  // const token =
  //   'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlcyI6IlJPTEVfQURNSU4iLCJpYXQiOjE3MDYxNjE0NzUsImV4cCI6MTcwOTc2MTQ3NX0.H2sDyNzPd3botA_4GlmWgsMamJmg-H-m2rMPl6fnBCA';
  // localStorage.setItem('token', token);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields before submission
    if (!title || !description) {
      alert('Please fill in all fields');
      return;
    }

    try {
      // Prepare data
      const formData = {
        title,
        description,
      };

      // Submit data to the API
      const authToken = localStorage.getItem('token');
        const response = await axios.post(
          'http://localhost:9902/ipo/admin/createFeed',
          formData,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        alert('Feed created successfuly');
      // Handle the API response as needed
      console.log('API Response:', response.data);

      // Reset form fields
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error submitting data:', error.message);
      // Handle the error as needed
      // You might want to set an error state and display a message to the user
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        className="feed-form-container"
        display="flex"
        flexDirection="column"
        alignItems="center"
        padding={3}
      >
        <form onSubmit={handleSubmit}>
          <Box marginBottom={2} width="100%">
            <Typography variant="subtitle1">Title:</Typography>
            <TextField
              variant="outlined"
              fullWidth
              margin="dense"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Box>
          <Box marginBottom={2} width="100%">
            <Typography variant="subtitle1">Description:</Typography>
            <TextField
              variant="outlined"
              fullWidth
              margin="dense"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>
          <Box display="flex" justifyContent="center" marginTop="1rem" width="100%">
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default FeedForm;
