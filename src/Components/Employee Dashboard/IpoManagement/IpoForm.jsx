import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import axios from 'axios';

const IpoForm = () => {

  // const token =
  //   'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlcyI6IlJPTEVfQURNSU4iLCJpYXQiOjE3MDYxNjE0NzUsImV4cCI6MTcwOTc2MTQ3NX0.H2sDyNzPd3botA_4GlmWgsMamJmg-H-m2rMPl6fnBCA';
  // localStorage.setItem('token', token);


  const [ipoName, setIpoName] = useState('');
  const [minInvestment, setMinInvestment] = useState('');
  const [lotSize, setLotSize] = useState('');
  const [totalOfferSize, setTotalOfferSize] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [minPriceRange, setMinPriceRange] = useState('');
  const [maxPriceRange, setMaxPriceRange] = useState('');
  const [about, setAbout] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields before submission
    if (
      !ipoName ||
      !minInvestment ||
      !lotSize ||
      !totalOfferSize ||
      !startDate ||
      !endDate ||
      !minPriceRange ||
      !maxPriceRange ||
      !about
    ) {
      alert('Please fill in all fields');
      return;
    }

    // Prepare IPO data
    const ipoData = {
      ipoName,
      minInvestment,
      lotSize,
      totalOfferSize,
      startDate,
      endDate,
      minPriceRange,
      maxPriceRange,
      about,
    };

    try {
      // Call your backend API to submit the IPO data
      const authToken = localStorage.getItem('token');
        const response = await axios.post(
          'http://localhost:9902/ipo/admin/createIpo',
          ipoData,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        alert('ipo created successfuly');

      // Handle success, show a message, etc.
      console.log('IPO submitted successfully:', response.data);

      // Reset form fields
      setIpoName('');
      setMinInvestment('');
      setTotalOfferSize('');
      setLotSize('');
      setStartDate('');
      setEndDate('');
      setMinInvestment('');
      setMaxPriceRange('');
      setAbout('');
    } catch (error) {
      console.error('Error submitting IPO:', error.message);
      // Handle error, show a message, etc.
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        className="ipo-form-container"
        display="flex"
        flexDirection="column"
        alignItems="center"
        padding={3}
      >
        <form onSubmit={handleSubmit}>
          <Box display="flex" marginBottom={2} width="100%">
            <Box marginRight={2} flex={1}>
              <Typography variant="subtitle1">IPO Name:</Typography>
              <TextField
                variant="outlined"
                fullWidth
                margin="dense"
                value={ipoName}
                onChange={(e) => setIpoName(e.target.value)}
              />
            </Box>
            <Box flex={1}>
              <Typography variant="subtitle1">Min Insvestment:</Typography>
              <TextField
                variant="outlined"
                fullWidth
                margin="dense"
                value={minInvestment}
                onChange={(e) => setMinInvestment(e.target.value)}
              />
            </Box>
          </Box>
          {/* Repeat the same pattern for other fields... */}
          <Box display="flex" marginBottom={2} width="100%">
            <Box marginRight={2} flex={1}>
              <Typography variant="subtitle1">Lot Size:</Typography>
              <TextField
                variant="outlined"
                fullWidth
                margin="dense"
                value={lotSize}
                onChange={(e) => setLotSize(e.target.value)}
              />
            </Box>
            <Box flex={1}>
              <Typography variant="subtitle1">Total Size:</Typography>
              <TextField
                variant="outlined"
                fullWidth
                margin="dense"
                value={totalOfferSize}
                onChange={(e) => setTotalOfferSize(e.target.value)}
              />
            </Box>
          </Box>
          <Box display="flex" marginBottom={2} width="100%">
            <Box marginRight={2} flex={1}>
              <Typography variant="subtitle1">IPO Start Date:</Typography>
              <TextField
                type="date"
                variant="outlined"
                fullWidth
                margin="dense"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Box>
            <Box flex={1}>
              <Typography variant="subtitle1">IPO End Date:</Typography>
              <TextField
                type="date"
                variant="outlined"
                fullWidth
                margin="dense"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Box>
          </Box>
          <Box display="flex" marginBottom={2} width="100%">
            <Box marginRight={2} flex={1}>
              <Typography variant="subtitle1">Price Range:</Typography>
              <Box display={'flex'} flexDirection={'row'} gap={2}>
                <TextField
                  label="Min Price"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  type="number"
                  value={minPriceRange}
                  onChange={(e) => setMinPriceRange(e.target.value)}
                />
                <TextField
                  label="Max Price"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  type="number"
                  value={maxPriceRange}
                  onChange={(e) => setMaxPriceRange(e.target.value)}
                />
              </Box>
            </Box>
          </Box>
          <Box display="flex" marginBottom={2} width="100%">
            <Box flex={1}>
              <Typography variant="subtitle1">About Company:</Typography>
              <TextField
                variant="outlined"
                fullWidth
                margin="dense"
                multiline
                rows={3}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </Box>
          </Box>
          <Box display="flex" justifyContent="center" marginTop="1rem" width="100%">
            <Button type="submit" variant="contained" color="primary">
              Submit IPO
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default IpoForm;
