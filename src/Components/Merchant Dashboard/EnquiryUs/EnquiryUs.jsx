import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Divider } from '@mui/material';
import axios from 'axios';

const EnquiryUs = () => {
  // Token line
  // const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrdW1hcmlha2Fua3NoYTMzOEBnbWFpbC5jb20iLCJyb2xlcyI6IlJPTEVfTUVSQ0hBTlQiLCJpYXQiOjE3MDYxODU4NTAsImV4cCI6MTcwOTc4NTg1MH0._7IUn1KesK1VuQbB8BGeck6i4SEz-_kiyOzEvOKdscI";
  // localStorage.setItem('token', token);

  const [ipo, setIpo] = useState('');
  const [seriesId, setSeriesId] = useState('');
  const [problem, setProblem] = useState('');
  const [description, setDescription] = useState('');
  const [availableIPOs, setAvailableIPOs] = useState([]);

  useEffect(() => {
    // Fetch available IPOs
    const fetchIPOs = async () => {
      try {
        const authToken = localStorage.getItem('token');
        const response = await axios.get('http://localhost:9902/ipo/merchant/getAllIpos', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        setAvailableIPOs(response.data);
      } catch (error) {
        console.error('Error fetching IPOs:', error);
      }
    };

    fetchIPOs();
  }, []); // Run once on component mount

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Prepare the enquiry data
    if (!ipo || !seriesId || !problem || !description) {
      alert('Please fill in all required fields.');
      return;
    }
    const enquiryData = {
      ipoName: ipo,
      seriesId: seriesId,
      problem: problem,
      description: description,
    };

    try {
      // Make the API call to submit the enquiry
      // const response = await axios.post('http://localhost:9902/ipo/merchant/submitEnquires', enquiryData);

      const authToken = localStorage.getItem('token');
      const response = await axios.post('http://localhost:9902/ipo/merchant/submitEnquires', enquiryData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const newEnquiry = response.data;

      // Update the state to display the new enquiry in the active enquiries section
      // setActiveEnquiries([...activeEnquiries, newEnquiry]);
      alert("enquiry submitted");
      fetchEnquiries();

      // Clear the form fields
      setIpo('');
      setSeriesId('');
      setProblem('');
      setDescription('');
    } catch (error) {
      
      console.error('Error submitting enquiry:', error);
    }
  };
  const [activeEnquiries, setActiveEnquiries] = useState([]);



  
    const fetchEnquiries = async () => {
      try {
        const authToken = localStorage.getItem('token');

        // Fetch active enquiries
        const activeEnquiriesResponse = await axios.get('http://localhost:9902/ipo/merchant/getExistingEnquiriesOfMerchant', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setActiveEnquiries(activeEnquiriesResponse.data);

      } catch (error) {
        console.error('Error fetching enquiries:', error);
      }
    };
    useEffect(() => {

    fetchEnquiries();
  }, []); // Run once on component mount

  const activeData = activeEnquiries.filter((enquiry) => enquiry.status === 'OPEN');
  const closedData = activeEnquiries.filter((enquiry) => enquiry.status === 'CLOSED');

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      gap: 3,
      flexWrap: 'wrap'
    }} >

      {/* -------enquiry form- */}
      <Box display="flex" flexDirection="column" alignItems="center" width={400} marginTop={'2rem'}>
        <Typography variant="h5" gutterBottom>
          Enquiry Form
        </Typography>

        <form onSubmit={handleSubmit} style={{ width: '300px', textAlign: 'center', marginTop: '2rem' }}>

          <Select
            label="IPO"
            value={ipo}
            onChange={(e) => {
              setIpo(e.target.value);
              const selectedIpo = availableIPOs.find((ipo) => ipo.ipoName === e.target.value);
              if (selectedIpo) {
                setSeriesId(selectedIpo.seriesId);
              }
            }}
            fullWidth
            margin="normal"
          >
            {availableIPOs.map((ipo) => (
              <MenuItem key={ipo.id} value={ipo.ipoName}>
                {ipo.ipoName}
              </MenuItem>
            ))}
          </Select>

          <TextField label="Series Id" readOnly value={seriesId}  fullWidth margin="normal" />
          <TextField label="problem" value={problem} onChange={(e) => setProblem(e.target.value)} fullWidth margin="normal" />
          <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth margin="normal" multiline rows={4} />
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '16px' }}>
            Submit
          </Button>
        </form>
      </Box>

      <Divider orientation="vertical" flexItem />

      {/* --history */}

      <Box display="flex" flexDirection="column" alignItems="center" marginTop="2rem" width={500}>
        <Typography variant="h5" gutterBottom>
          Enquiry History
        </Typography>

        <Box width="80%" display="flex" flexDirection="column" alignItems="center" marginTop="1rem">
          {/* Active Box */}
          <Box width="100%" marginBottom="1rem">
            <Typography variant="h6" gutterBottom>
              Active
            </Typography>

            {activeData.map((enquiry) => (
              <Accordion key={enquiry.id}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">{enquiry.problem}</Typography>
                </AccordionSummary>
                <AccordionDetails>

                  <Typography>
                    <strong>Description:</strong> {enquiry.description}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>


          <Box width="100%">
            <Typography variant="h6" gutterBottom>
              Closed
            </Typography>
            {closedData.map((enquiry) => (
              <Accordion key={enquiry.id}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">{enquiry.problem}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {/* <Typography>
          <strong>Problem:</strong> {enquiry.problem}
        </Typography> */}
                  <Typography>
                    <strong>Description:</strong> {enquiry.description}
                  </Typography>
                  <Typography>
                    <strong>Response:</strong> {enquiry.response}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}


          </Box>
        </Box>
      </Box>



    </Box>
  );
};

export default EnquiryUs;