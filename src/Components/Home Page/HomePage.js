// import React, { useState, useEffect } from "react";
import Navbar from "./Navbar.js";
import Carousel from "./Carousel.js";
import About from "./About.js";
import FAQ from "./FAQ.js";
import Contact from "./Contact.js";
import Footer from "./Footer.js";
import Copyright from "./Copyright.js";

// import TestimonalCarousel from "./TestimonalCarousel.js";
// import Spinner from "./Spinner.js";

const HomePageLayout = () => {
  /* USE THIS WHEN YOU HAVE TO FETCH ANY DATA OR SEND ANY DATA LIKE IN REGISTRATION FORM
  
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchData = () => {
  //     setTimeout(() => {
  //       setLoading(false);
  //     }, 1000);
  //   };

  //   fetchData();
  // }, []);
  */

  return (
    <div className="home" id="home">
      <div className="site-wrap">
        {/* {loading && <Spinner />} */}
        <Navbar />
        <Carousel />
        <About />
        <FAQ />
        {/* <Video /> */}
        {/* <Testimonials /> */}
        <Contact />
        <Footer />
        <Copyright />
      </div>
    </div>
  );
};

export default HomePageLayout;
