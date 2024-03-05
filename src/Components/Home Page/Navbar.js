import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";

const Navbar = () => {
  return (
    <div className="container-fluid bg-white sticky-top">
      <div className="container">
        <nav className="navbar navbar-expand-lg bg-white navbar-light py-2 py-lg-0">
          <Link to="/" className="navbar-brand">
            <h1 className="logo">
              <Link to="/">Axis IPO</Link>
            </h1>
          </Link>
          <button
            type="button"
            className="navbar-toggler ms-auto me-0"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto">
              <Link
                activeClass="active"
                to="home"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="nav-item nav-link nav-pointer">
                  Home
              </Link>
              <Link
                activeClass="active"
                to="about"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="nav-item nav-link">
                About
              </Link>
              <Link
                activeClass="active"
                to="blog"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="nav-item nav-link nav-pointer">
                  FAQs
              </Link>
              <Link
                activeClass="active"
                to="contact"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="nav-item nav-link"
              >
                Contact
              </Link>
              <NavLink to="/login" className="nav-item nav-link">
                Login/Register
              </NavLink>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
