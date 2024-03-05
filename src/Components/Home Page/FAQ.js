import React from 'react';

const FAQ = () => {
  return (
    <div className="container-xxl py-5" id="blog">
      <div className="container">
        <div className="row g-6">
          <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
            <br /><br /><br /> <img className="img-fluid" src="img/article4.jpg" alt="" />
          </div>
          <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
            <div className="section-title">
              <p className="fs-5 fw-medium fst-italic text-primary">FAQs:</p>
              <h1 className="display-6">IPO- Axis Bank</h1>
            </div>
                 <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 btn-lg-square bg-white text-primary rounded-circle me-3">
                      <i className="fa fa-check"></i>
                    </div>
                    <span className="text-dark ">How can I apply for ASBA?<br />
                    <p>If you are an Axis Bank Net Banking customer, you can now apply online. 
                    Log in on NetBanking and select the "INVESTMENT" option from the bottom left menu. 
                    Then select IPO and Rights Issue You will then be re-directed to our IPO Online System.</p>
                    </span>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 btn-lg-square bg-white text-primary rounded-circle me-3">
                      <i className="fa fa-check"></i>
                    </div>
                    <span className="text-dark"> I do not have a Bank account with Axis Bank. 
                    Can I still apply through your Bank for IPOs using Axis Bank's ASBA process?<br />
                    <p>To apply for an IPO from Axis Bank using ASBA, you should have an account with the Bank. 
                    However, it is not compulsory for you to have a Demat Account.</p>
                    </span>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 btn-lg-square bg-white text-primary rounded-circle me-3">
                      <i className="fa fa-check"></i>
                    </div>
                    <span className="text-dark"> How can I apply in IPO via UPI?<br />
                    <p>Register on Google Pay & link your Axis Bank Account with okaxisbank handle.
                    Enter your UPI ID in the IPO application form and submit it.
                    Approve the notification in the Google pay app to block the amount for IPO.
                    On allotment of the shares, the money is automatically debited from this blocked amount.</p>
                    </span>
                  </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
