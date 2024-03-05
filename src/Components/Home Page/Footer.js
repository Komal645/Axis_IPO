import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <Grid container sx={{ background: 'linear-gradient(to right, #eeeeee, #999999)', padding: '2rem' }}>
      {/* Contact Us */}
      <Grid item xs={12} md={3}>
        <Typography variant="h6" sx={{ marginBottom: '1rem' }}>Our Office</Typography>
        <Typography>Address: Mumbai, Maharashtra</Typography>
        <Typography>Email: axis@gmail.com</Typography>
        <Typography>Phone: +012 345 67890</Typography>
        {/* <Typography>Copyright 2024 Axis Bank</Typography> */}
      </Grid>

      {/* Quick Links */}
      <Grid item xs={12} md={3}>
        <Typography variant="h6" sx={{ marginBottom: '1rem' }}>Quick Links</Typography>
        <div className="btn btn-link mb-1">
          <Link
            activeClass="active"
            to="about"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            About Us
          </Link>
        </div><br/>
        <div className="btn btn-link mb-1">
          <Link
            activeClass="active"
            to="contact"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            Contact Us
          </Link>
        </div><br/>
        <div className="btn btn-link mb-1">
          <Link
            activeClass="active"
            to="blog"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            FAQs
          </Link>
        </div><br/>
        <div className="btn btn-link">
          <NavLink
            to="/TandC"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            Terms & Conditions
          </NavLink>
        </div>
      </Grid>

      {/* Social Media */}
      <Grid item xs={12} md={3}>
        <Typography variant="h6" sx={{ marginBottom: '1rem' }}>Social Media</Typography>
        <div className="d-flex pt-3">
          <a
            className="btn btn-square btn-primary rounded-circle me-2"
            href=""
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            className="btn btn-square btn-primary rounded-circle me-2"
            href=""
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            className="btn btn-square btn-primary rounded-circle me-2"
            href=""
          >
            <i className="fab fa-youtube"></i>
          </a>
          <a
            className="btn btn-square btn-primary rounded-circle me-2"
            href=""
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </Grid>

      {/* Business Hours */}
      <Grid item xs={12} md={3}>
        <Typography variant="h6" sx={{ marginBottom: '1rem' }}>Business Hours</Typography>
        <Typography>Monday - Friday</Typography>
        <Typography>09:00 am - 07:00 pm</Typography>
        <Typography>Saturday</Typography>
        <Typography>09:00 am - 12:00 pm</Typography>
        <Typography>Sunday</Typography>
        <Typography>Closed</Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;

