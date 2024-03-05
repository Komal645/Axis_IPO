import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LatestNews = () => {
  // const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlcyI6IlJPTEVfQURNSU4iLCJpYXQiOjE3MDYyNjUxNTAsImV4cCI6MTcwOTg2NTE1MH0.iIdSHHnyeFZ7y_8qXkyej1QE-xAxmwAM7DFRgkQ4A9w'; // Replace with your access token
  // localStorage.setItem('token', token);

  const [newsData, setNewsData] = useState([]);
  const [scrollIndex, setScrollIndex] = useState(0);
  const navigate = useNavigate();

  const itemsToShow = 6; // Number of news items to display at a time

  const handleScrollUp = () => {
    setScrollIndex((prevIndex) => (prevIndex - 1 + newsData.length) % newsData.length);
  };

  const handleScrollDown = () => {
    setScrollIndex((prevIndex) => (prevIndex + 1) % newsData.length);
  };

  const handleViewClick = (index) => {
    const selectedNews = newsData[(scrollIndex + index) % newsData.length];
    if (selectedNews) {
      navigate('/merchant/blog');
      console.log('Clicked on news column');
    }
  };

  const handleViewMoreClick = () => {
    navigate('/merchant/blog');
    console.log('Clicked on View More');
  };

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const authToken = localStorage.getItem('token');
        const response = await axios.get('http://localhost:9902/ipo/merchant/getAllFeeds', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
  
        // Check if the component is still mounted before updating the state
        if (isMounted.current) {
          setNewsData(response.data);
        }
      } catch (error) {
        console.error('Error fetching news data:', error);
      }
    };
  
    const isMounted = { current: true };
  
    fetchNewsData();
  
    // Cleanup on component unmount
    return () => {
      isMounted.current = false;
    };
  }, []);
  

  const visibleNews = newsData.slice(scrollIndex, scrollIndex + itemsToShow);

  return (
    <Box width="100%" margin="0rem">
      <Box margin={'2rem'} marginBottom={2}>
        <Typography variant="h5" gutterBottom>
          Latest News and Feeds
        </Typography>
      </Box>

      <Box
        position="relative"
        maxHeight="250px"
        width={'80%'}
        padding={2}
        margin={'2rem'}
        marginLeft={'4rem'}
        border="1px solid #ccc"
        borderRadius={4}
        overflow="hidden"
        bgcolor={'#ffdd99'}
      >
        {visibleNews.map((news, index) => (
          <React.Fragment key={index}>
            <Link to="/merchant/blog" style={{ textDecoration: 'none' }}>
              <Box
                bgcolor={index % 2 === 0 ? '#ffcc66' : '#ffdd99'}
                onClick={() => handleViewClick(index)}
                style={{ cursor: 'pointer' }}
              >
                <Typography>{news.title}</Typography>
              </Box>
            </Link>
            {index !== visibleNews.length - 1 && <Box borderBottom="1px solid #ccc" marginBottom={1} />}
          </React.Fragment>
        ))}

        <IconButton onClick={handleScrollUp} style={{ position: 'absolute', right: '8px', top: '8px' }}>
          <ArrowUpwardIcon />
        </IconButton>
        <IconButton onClick={handleScrollDown} style={{ position: 'absolute', right: '8px', bottom: '8px' }}>
          <ArrowDownwardIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default LatestNews;