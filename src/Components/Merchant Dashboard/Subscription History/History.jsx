import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import axios from 'axios';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

const CompanyCard = ({ company, onClickDetails }) => {
  return (
    <Card style={{ marginBottom: '16px', boxShadow: 5, width: 350 }}>
      <CardContent>
        <Typography marginBottom={2} variant="h6" gutterBottom>
          {company.ipo.ipoName}
        </Typography>

        <Box display="flex" justifyContent="space-around">
          <Box>
            <Typography variant="subtitle1">{company.ipo.endDate}</Typography>
            <Typography variant="body2" style={{ margin: '8px 0' }}>
              Date
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1">{company.ipo.minPriceRange}$-{company.ipo.maxPriceRange}$</Typography>
            <Typography variant="body2" style={{ margin: '8px 0' }}>
              Price Range
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1">{company.ipo.totalOfferSize}</Typography>
            <Typography variant="body2" style={{ margin: '8px 0' }}>
              Issue Size
            </Typography>
          </Box>
        </Box>

        {/* View Details Button */}
        <Button variant="contained" color="primary" style={{ marginTop: '1.5rem' }} onClick={() => onClickDetails(company)}>
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

const History = ({ setActiveTab }) => {
  // const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrdW1hcmlha2Fua3NoYTMzOEBnbWFpbC5jb20iLCJyb2xlcyI6IlJPTEVfTUVSQ0hBTlQiLCJpYXQiOjE3MDYxNjI0NzIsImV4cCI6MTcwOTc2MjQ3Mn0.z_qLVk5SdHwoPd0cxwpolXAIrqV7kHfENhsBORD42Qs";
  // localStorage.setItem('token', token);

  const [cards, setCards] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  // useEffect(() => {
    const fetchCards = async () => {
      try {
        const authToken = localStorage.getItem('token');
        const response = await axios.get(
          'http://localhost:9902/ipo/merchant/getExistingIpoApplication',
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setCards(response.data);
        console.log(cards);
      } catch (error) {
        console.error('Error fetching cards:', error.message);
      }
    };
    useEffect(() => {

    fetchCards();
  }, []);

  const handleViewDetails = (company) => {
    setSelectedCompany(company);
  };

  const handleBackToCards = () => {
    setSelectedCompany(null);
  };

  const handleCancelApplication = async (id) => {
    try {
      const authToken = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:9902/ipo/merchant/withdrawIpoApplication/${id}`,
        { /* Add necessary data for canceling the application */ },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      alert("Application canceled successfully")
      console.log('Application canceled:', response.data);
      fetchCards();
      // Add logic to update the UI or perform any additional actions after canceling the application
    } catch (error) {
      console.error('Error canceling application:', error.message);
      // Handle the error, show a message to the user, etc.
    }
  };

  const CompanyCardSection = ({ cards, sectionTitle }) => (
    <div>
      <h2>{sectionTitle}</h2>
      <Grid container spacing={2}>
        {cards.map((card, index) => (
          <Box key={index} display="flex" flexDirection={'row'} flexWrap={'wrap'} justifyContent={'space-between'} padding={'1rem'}>
            <CompanyCard company={card} onClickDetails={handleViewDetails} />
          </Box>
        ))}
      </Grid>
    </div>
  );

  const CompanyDetail = ({ company }) => {
    const getStatusIcon = (status) => {
      const iconColor = status === 'PENDING' ? '#e68600' : 'gray';

      return status === 'PENDING' ? <ErrorIcon sx={{ color: iconColor }} /> : <CheckCircleIcon sx={{ color: iconColor }} />;
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
        <h2>{company.companyName}</h2>

        <Box>
          <Typography variant="h6">IPO Detail</Typography>
          <Typography>Series Id: {company.ipo.seriesId}</Typography>
          <Typography>Investment: {company.totalInvestement}</Typography>
          <Typography>Lot Size: {company.alotSize}</Typography>
          <Typography>Bid Price: {company.bidPrice}$</Typography>
        </Box>

        <Box>
          <Typography variant="h6">Status</Typography>

          <Box display="flex" alignItems="center">
            <ListItemIcon>{getStatusIcon('applied')}</ListItemIcon>
            <Typography>Applied for IPO: {company.applyDate}</Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <ListItemIcon>{getStatusIcon('success')}</ListItemIcon>
            <Typography>Application Placed Successfully: {company.applyDate}</Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <ListItemIcon>{getStatusIcon(company.status)}</ListItemIcon>
            <Typography>
              IPO Allotment status: {company.status === 'PENDING' ? 'Not announced yet' : company.status}
            </Typography>
          </Box>
        </Box>

        {company.status === 'PENDING' && (
          <Button variant='outlined' color="primary" onClick={()=>handleCancelApplication(company.id)}>
            Cancel Application
          </Button>
        )}

        <Button variant="text" color="primary" onClick={handleBackToCards}>
          Back
        </Button>
      </div>
    );
  };

  const activeCards = cards.filter((card) => card.status === 'PENDING');
  const closedCards = cards.filter((card) => card.status === 'APPROVED');
  const declinedCards = cards.filter((card) => card.status === 'DECLINED' || card.status === 'WITHDRAW');

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
  {selectedCompany ? (
    <CompanyDetail company={selectedCompany} />
  ) : (
    <>
      {activeCards && activeCards.length > 0 && (
        <CompanyCardSection cards={activeCards} sectionTitle="Pending" />
      )}
      {closedCards && closedCards.length > 0 && (
        <CompanyCardSection cards={closedCards} sectionTitle="Allotted" />
      )}
      {declinedCards && declinedCards.length > 0 && (
        <CompanyCardSection cards={declinedCards} sectionTitle="Declined or Withdraw" />
      )}
    </>
  )}
</div>

  );
};

export default History;
