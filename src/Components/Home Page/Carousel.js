import React from "react";

const Carousel = () => {
  return (
    <div className="container-fluid px-0 mb-5">
      <div className="carousel-text">
        <p className="fs-4 text-white animated zoomIn">
          Welcome to{" "}
          <strong className="text-dark">Axis IPO</strong>
        </p>
        <h5 className="display-4 text-dark mb-4 animated zoomIn">
          "Ensuring a seamless transition into the public domain."
        </h5>
      </div>
      <style>
        {`
          .carousel-text {
            background-color: #97144d;
            padding: 6rem;
            text-align: center;
          }

          .carousel-text p, .carousel-text h5 {
            margin: 0;
          }
        `}
      </style>
    </div>
  );
};

export default Carousel;
