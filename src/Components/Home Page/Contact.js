import React from 'react';

const Contact = () => {
  return (
    <div className="container-xxl contact py-5" id ="contact">
      <div className="container">
        <div className="section-title text-center mx-auto">
          <p className="fs-5 fw-medium fst-italic text-primary">Contact Us</p>
          <h1 className="display-6">Contact us right now</h1>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <p className="text-center mb-5">
              Have questions or need assistance? Our dedicated team is here to help. Feel free to reach out to us using the contact information below:
            </p>
            <div className="row g-5">
              <div className="col-md-4 text-center">
                <div className="btn-square mx-auto mb-3">
                  <i className="fa fa-envelope fa-2x text-white"></i>
                </div>
                {/* <p className="mb-2">agritechsolution@gmail.com</p> */}
                <p className="mb-0">axis@gmail.com</p>
              </div>
              <div className="col-md-4 text-center">
                <div className="btn-square mx-auto mb-3">
                  <i className="fa fa-phone fa-2x text-white"></i>
                </div>
                <p className="mb-2">1800-419-5959</p>
                <p className="mb-0">1800-419-5959</p>
              </div>
              <div className="col-md-4 text-center">
                <div className="btn-square mx-auto mb-3">
                  <i className="fa fa-map-marker-alt fa-2x text-white"></i>
                </div>
                <p className="mb-0">Mumbai, Maharashtra</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
