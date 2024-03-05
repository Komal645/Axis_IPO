import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Grid container sx={{ background: 'linear-gradient(to right, #eeeeee, #999999)', padding: '2rem' }}>
      {/* Contact Us */}
      <Grid item xs={12} md={3}>
        <Typography variant="h6" sx={{ marginBottom: '1rem' }}>Contact Us</Typography>
        <Typography>Address: 123 Street, City</Typography>
        <Typography>Email: contact@example.com</Typography>
        <Typography>Phone: +1 123 456 7890</Typography>
        <Typography>Copyright 2024 Axis Bank</Typography>
      </Grid>

      

      {/* Shareholder Corner */}
      <Grid item xs={12} md={3}>
        <Typography variant="h6" sx={{ marginBottom: '1rem' }}>Quick Links</Typography>
        <Typography component="div">
          <a href="/" style={{ color: 'black', textDecoration: 'none' }}>About Us</a>
        </Typography>
        <Typography component="div">
          <a href="/" style={{ color: 'black', textDecoration: 'none' }}>Contact Us</a>
        </Typography>
        <Typography component="div">
          <a href="/" style={{ color: 'black', textDecoration: 'none' }}>FAQS</a>
        </Typography>
        <Typography component="div">
          <a href="/TandC" style={{ color: 'black', textDecoration: 'none' }}>Terms & Conditions</a>
        </Typography>
        {/* Add more links as needed */}
      </Grid>

      {/* Media Center */}
      <Grid item xs={12} md={3}>
      <Typography variant="h6" sx={{ marginBottom: '1rem' }}>Social Media</Typography>

      {/* Social Media Icons in a Row */}
      <IconButton  target="_blank" rel="noopener noreferrer">
        <FacebookIcon />
      </IconButton>

      <IconButton  target="_blank" rel="noopener noreferrer">
        <TwitterIcon />
      </IconButton>

      <IconButton target="_blank" rel="noopener noreferrer">
        <YouTubeIcon />
      </IconButton>

      <IconButton  target="_blank" rel="noopener noreferrer">
        <LinkedInIcon />
      </IconButton>
      
      {/* Add more social media icons as needed */}
    </Grid>

      {/* Other Links */}
      <Grid item xs={12} md={3}>
        <Typography variant="h6" sx={{ marginBottom: '1rem' }}>Business Hours</Typography>
        <Typography>Monday - Friday </Typography>
        <Typography>09:00 am - 07:00 pm</Typography>
        <Typography>Saturday</Typography>
        <Typography>09:00 am - 12:00 pm</Typography>
        <Typography>Sunday</Typography>
        <Typography>Closed</Typography>
        {/* Add more links as needed */}
      </Grid>
    </Grid>
  );
};

export default Footer;
