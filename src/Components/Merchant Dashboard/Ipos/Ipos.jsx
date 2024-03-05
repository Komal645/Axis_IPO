import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CompanyCard = ({ company, onClickDetails }) => {
  const { ipoName, endDate, minPriceRange, maxPriceRange, totalOfferSize } = company;

  return (
    <Card style={{ marginBottom: '16px', boxShadow: 5, width: 350,  }}>
      <CardContent>
        <Typography marginBottom={2} variant="h6" gutterBottom>
          {ipoName}
        </Typography>

        <Box display="flex" justifyContent="space-around">
          <Box>
            <Typography variant="subtitle1">{endDate}</Typography>
            <Typography variant="body2" style={{ margin: '8px 0' }}>
              Date
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1">{minPriceRange}$-{maxPriceRange}$</Typography>
            <Typography variant="body2" style={{ margin: '8px 0' }}>
              Price Range
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1">{totalOfferSize}</Typography>
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


const Ipos = ({ setActiveTab }) => {

  // const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrdW1hcmlha2Fua3NoYTMzOEBnbWFpbC5jb20iLCJyb2xlcyI6IlJPTEVfTUVSQ0hBTlQiLCJpYXQiOjE3MDYxNjI0NzIsImV4cCI6MTcwOTc2MjQ3Mn0.z_qLVk5SdHwoPd0cxwpolXAIrqV7kHfENhsBORD42Qs";
  // localStorage.setItem('token',token);

  const [cards, setCards] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
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
        setCards(response.data);
        console.log(cards);
      } catch (error) {
        console.error('Error fetching cards:', error.message);
      }
    };

    fetchCards();
  }, []);

  const handleViewDetails = (company) => {
    setSelectedCompany(company);
  };

  const handleBackToCards = () => {
    setSelectedCompany(null);
  };

  const CompanyCardSection = ({ cards, sectionTitle }) => (
    <div>
      <h2>{sectionTitle}</h2>
      <Grid container spacing={2}>
        {cards.map((card, index) => (
          <Box display="flex" flexDirection={'row'} flexWrap={'wrap'}  justifyContent={'space-between'} padding={'1rem'} >
            <CompanyCard company={card} onClickDetails={handleViewDetails} />
          </Box>
        ))}
      </Grid>
    </div>
  );

  const [showFullContent, setShowFullContent] = useState(false);

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };
  const CompanyDetail = ({ company }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
      <h2>{company.companyName}</h2>
      <Box>
        <Typography variant="h6">IPO Detail</Typography>
        <Typography>Series Id: {company.seriesId}</Typography>
        <Typography>Start Date: {company.startDate}</Typography>
        <Typography>End Date: {company.endDate}</Typography>
        <Typography>Min Investment: {company.minInvestment}</Typography>
        <Typography>Lot Size: {company.lotSize}</Typography>
        <Typography>Price Range: {company.minPriceRange}$-{company.maxPriceRange}$</Typography>
        <Typography>Issue Size: {company.totalOfferSize}</Typography>
      </Box>

      <Box>
        <Typography variant="h6">Subscription Rate</Typography>
        <Typography>Retail Investment Rate: {company.retailSubcriptionRate / 100}x</Typography>
        <Typography>Institutional Investment Rate: {company.niiSubcriptionRate/100}x</Typography>
        <Typography>Non-Institutional Investment Rate: {company.bilSubcriptionRate/100}x</Typography>
      </Box>

      <Box>
      <Typography variant="h6">About the Company</Typography>
        <Typography>
          {showFullContent ? company.about : `${company.about.slice(0, 70)}...`}
        </Typography>
        {company.about.length > 70 && (
          <Button variant="text" color="primary" onClick={toggleContent}>
            {showFullContent ? 'Read Less' : 'Read More'}
          </Button>
        )}
      </Box>

      {/* //--faqs */}

      <Box>
      <Box justifyContent={'space-between'} display={'flex'} flexDirection={'row'} >
      <Typography variant="h6" gutterBottom>
        Top IPO FAQs
      </Typography>
      <Button variant='text' onClick={() => setActiveTab(2)}>Need help?</Button>

      </Box>
      {/* Accordion 1 */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h7">What is issue size of {company.ipoName} IPO ?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {company.ipoName} issue size is {company.totalOfferSize}.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Accordion 2 */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h7">What is 'pre-apply' for {company.ipoName} IPO ?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Pre-apply allow you to apply for the {company.ipoName} 2 days before the subsciption end date.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Accordion 3 */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h7">What will pe benifit to me if I apply for {company.ipoName} IPO ?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Pre-apply allow you to apply for the {company.ipoName} 2 days before the subsciption end date..
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>


      <Button variant='outlined' color="primary" onClick={handleBackToCards} sx={{width:80}} >
        Back
      </Button>
    </div>
  );

  const activeCards = cards.filter((card) => card.status === 'OPEN');
  const closedCards = cards.filter((card) => card.status === 'CLOSED');

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
    {selectedCompany ? (
      <CompanyDetail company={selectedCompany} />
    ) : (
      <>
        {activeCards && activeCards.length > 0 && (
          <CompanyCardSection cards={activeCards} sectionTitle="Open Now" />
        )}
        {closedCards && closedCards.length > 0 && (
          <CompanyCardSection cards={closedCards} sectionTitle="Closed" />
        )}
      </>
    )}
  </div>
  
  );
};

export default Ipos;

