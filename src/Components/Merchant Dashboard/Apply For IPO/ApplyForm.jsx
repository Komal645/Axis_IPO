import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import axios from 'axios';

const ApplyForm = () => {
  // const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrdW1hcmlha2Fua3NoYTMzOEBnbWFpbC5jb20iLCJyb2xlcyI6IlJPTEVfTUVSQ0hBTlQiLCJpYXQiOjE3MDYxNjI0NzIsImV4cCI6MTcwOTc2MjQ3Mn0.z_qLVk5SdHwoPd0cxwpolXAIrqV7kHfENhsBORD42Qs";
  // localStorage.setItem('token', token);

  const [ipoData, setIpoData] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [lotSize, setLotSize] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedIpoo,setselectedIpoo]=useState('')

  useEffect(() => {
    const fetchIpoData = async () => {
      try {
        const authToken = localStorage.getItem('token');
        const response = await axios.get(
          'http://localhost:9902/ipo/merchant/getAllIpos',
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setIpoData(response.data);
        console.log(ipoData);
      } catch (error) {
        console.error('Error fetching IPO data:', error.message);
      }
    };

    fetchIpoData();
  }, []);

  const handleCompanyChange = (event) => {
    const companyName = event.target.value;
    const selectedIPO = ipoData.find((ipo) => ipo.ipoName === companyName);

    setSelectedCompany(companyName);
    setLotSize(selectedIPO?.lotSize || 0);
    setSelectedPrice(selectedIPO?.minPriceRange || 0);
    setTotalAmount(selectedIPO?.minInvestment || 0);
    setselectedIpoo(selectedIPO);
  };

  const handleIncrementLotSize = () => {
    const selectedIPO = ipoData.find((ipo) => ipo.ipoName === selectedCompany);

    if (selectedIPO) {
      setLotSize((prevLotSize) => {
        const newLotSize = prevLotSize + selectedIPO.lotSize;
        calculateTotalAmount(newLotSize);
        return newLotSize;
      });
    }
  };

  const handleDecrementLotSize = () => {
    const selectedIPO = ipoData.find((ipo) => ipo.ipoName === selectedCompany);

    if (selectedIPO && lotSize > selectedIPO.lotSize) {
      setLotSize((prevLotSize) => {
        const newLotSize = prevLotSize - selectedIPO.lotSize;
        calculateTotalAmount(newLotSize);
        return newLotSize;
      });
    }
  };

  const handlePriceChange = (event) => {
    const newPrice = parseFloat(event.target.value);
    setSelectedPrice(newPrice);
    calculateTotalAmount(lotSize);
  };

  const calculateTotalAmount = (lotSize) => {
    const selectedIPO = ipoData.find((ipo) => ipo.ipoName === selectedCompany);

    if (selectedIPO) {
      const totalAmount = (lotSize / selectedIPO.lotSize) * selectedIPO.minInvestment;
      setTotalAmount(totalAmount);
    }
  };

  const handleSubmit = async () => {
    const selectedIPO = ipoData.find((ipo) => ipo.ipoName === selectedCompany);

    if (selectedIPO){
    if(
      selectedPrice >= selectedIPO.minPriceRange &&
      selectedPrice <= selectedIPO.maxPriceRange
    ) {
      try {
        console.log(selectedCompany,
          lotSize,
          selectedPrice,
          totalAmount);
        const response = await axios.post(
          'http://localhost:9902/ipo/merchant/applyForIpo',
          {
            "ipoName":selectedCompany,
            "alotSize":lotSize,
            "bidPrice":selectedPrice,
            "totalInvestement":totalAmount,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        alert("Application submmitted successfuly");

        console.log('API response:', response.data);

        // Reset the form or perform other actions as needed
        setSelectedCompany('');
        setLotSize(0);
        setSelectedPrice(0);
        setTotalAmount(0);
        setErrorMessage('');
      } catch (error) {
        console.error('Error submitting IPO data:', error.message);
        // Handle the error, show an error message, or perform other actions as needed
        // setErrorMessage('Error submitting IPO data');
        alert("You aleardy have one pending application")
      }
    } else {
      setErrorMessage('Bid price is not in range');
    }
  }else{
    alert("fill all the fields")
  }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h6" gutterBottom>
        Apply for IPO
      </Typography>

      <form style={{ width: '300px', textAlign: 'center' }}>
        {/* Company Name Dropdown */}
        <TextField
          select
          label="Select Company"
          fullWidth
          margin="normal"
          value={selectedCompany}
          onChange={handleCompanyChange}
        >
          {ipoData.map((ipo) => (
            <MenuItem key={ipo.ipoName} value={ipo.ipoName}>
              {ipo.ipoName}
            </MenuItem>
          ))}
        </TextField>

        {/* Lot Size Input with Increment and Decrement Icons */}
        <TextField
          label="Lot Size"
          fullWidth
          margin="normal"
          type="number"
          value={lotSize}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={handleDecrementLotSize}>
                  <RemoveIcon />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleIncrementLotSize}>
                  <AddIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          inputProps={{ min: lotSize, readOnly: true }}
        />
        <Typography style={{   fontSize:'0.7rem',textAlign:'right' }}>
          Offer size: {selectedIpoo.totalOfferSize}
        </Typography>

        {/* Price Range Input */}
        <TextField
          label="Bid Price"
          fullWidth
          margin="normal"
          type="number"
          value={selectedPrice}
          onChange={handlePriceChange}
          inputProps={{
            step: '0.01',
          }}
        />
        <Typography  style={{ fontSize:'0.7rem', textAlign:'right'}}>
          Price Range: {selectedIpoo.minPriceRange}-{selectedIpoo.maxPriceRange}$
        </Typography>

        {/* Total Amount Display */}
        <Typography variant="body1" style={{ marginTop: '8px' }}>
          Total Amount: ${totalAmount}
        </Typography>

        {/* Error Message Display */}
        {errorMessage && (
          <Typography variant="body2" style={{ color: 'red', marginTop: '8px' }}>
            {errorMessage}
          </Typography>
        )}

        {/* Submit Button */}
        <Button
          type="button"
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          style={{ marginTop: '16px' }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default ApplyForm;
