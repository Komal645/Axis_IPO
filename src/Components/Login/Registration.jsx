import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Typography } from '@mui/material';
import Tesseract from 'tesseract.js';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Registration = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    password: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    merchantType: '',
  });
  const [file, setFile] = useState([]); // Added state for file
  const onDrop = async (acceptedFiles) => {
    const newFile = acceptedFiles[0];
    // setFile(newFile); // Set the file using the state
    setUploadedFile(newFile);

    try {
      const { data } = await Tesseract.recognize(newFile, 'eng', {
        logger: (info) => console.log(info),
        psm: 6,
      });

      const extractedInfo = extractInfoFromOCR(data.text);
      setFormData((prevFormData) => ({
        ...prevFormData,
        firstName: extractedInfo.firstName,
        phone: extractedInfo.phone,
        street: extractedInfo.street,
        city: extractedInfo.city,
        state: extractedInfo.state,
        country: extractedInfo.country,
        pincode: extractedInfo.pincode,
        // Set other relevant fields here based on your OCR results
      }));

      console.log('Details fetched from image:', extractedInfo);
    } catch (error) {
      console.error('Error during OCR:', error);
    }
  };


  const validatePassword = (value) => {
    // const passwordPattern = /^(?=.[A-Z])(?=.[!@#$&])(?=.*[0-9]).{8,}$/;
    const passwordPattern = /^(?=.*[A-Z])(?=.#)(?=.*[!@#$&])(?=.*[0-9]).{8,}$/;

    return passwordPattern.test(value);
    // return true;
  };

  const validateEmail = (value) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(value);
  };
 

  const validatePhoneNumber = (value) => {
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(value);
  };
  
  const validatePincode = (value) => {
    
    const pincodePattern = /^\d{6}$/;
    return pincodePattern.test(value);
  };

 



  const [documentError, setDocumentError] = useState('');

  const handleFileChange = (event) => {
    const newFile = event.target.files[0];
    if (newFile) {
      setFile(Array.from(event.target.files)); // Set the file using the state
      setUploadedFile(newFile);
      performOCR(newFile);
      setDocumentError("");
    }
    else{setDocumentError("upload file")};
  };

  const performOCR = async (file) => {
    try {
      const { data } = await Tesseract.recognize(file, 'eng', {
        logger: (info) => console.log(info),
        psm: 6,
      });

      console.log('OCR Text:', data.text);

      const extractedInfo = extractInfoFromOCR(data.text);
      setFormData((prevFormData) => ({
        ...prevFormData,
        firstName: extractedInfo.firstName,
        phone: extractedInfo.phone,
        street: extractedInfo.street,
        city: extractedInfo.city,
        state: extractedInfo.state,
        country: extractedInfo.country,
        pincode: extractedInfo.pincode,
        // Set other relevant fields here based on your OCR results
      }));

      console.log('Details fetched from image:', extractedInfo);
    } catch (error) {
      console.error('Error during OCR:', error);
    }
  };

  const extractInfoFromOCR = (text) => {
    const lines = text.split('\n');
    const extractedInfo = {
      firstName: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      country: '',
      pincode: '',
    };

    lines.forEach((line) => {
      const [key, value] = line.split(/:(.+)/);
      const trimmedValue = value ? value.trim() : '';

      switch (key.trim().toLowerCase()) {
        case 'first name':
          extractedInfo.firstName = trimmedValue;
          break;
        case 'phone':
        case 'mobile':
          extractedInfo.phone = trimmedValue;
          break;
        case 'street':
        case 'address':
          extractedInfo.street = trimmedValue;
          break;
        case 'city':
          extractedInfo.city = trimmedValue;
          break;
        case 'state':
          extractedInfo.state = trimmedValue;
          break;
        case 'country':
          extractedInfo.country = trimmedValue;
          break;
        case 'pincode':
        case 'postal code':
          extractedInfo.pincode = trimmedValue;
          break;
        // Add other cases as needed
      }
    });

    return extractedInfo;
  };

  // const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const validateFields = (data) => {
    const validationErrors = {};
  
    Object.entries(data).forEach(([key, value]) => {
      if (typeof value !== 'string' || value.trim() === '') {
        validationErrors[key] =` ${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    });
  
    return validationErrors;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
  
    
    
  
    try {

      const validationErrors = validateFields(formData);
     
      if (!validateEmail(formData.email)) {
        validationErrors.email = 'Invalid email address';
      }
  
      if (!validatePassword(formData.password)) {
        validationErrors.password =
          'Password must contain at least 1 uppercase letter, 1 special character, 1 digit, and be at least 8 characters long.';
      }
  
      if (!validatePhoneNumber(formData.phone)) {
        validationErrors.phone = 'Invalid phone number. It should be a 10-digit number.';
      }
  
      if (!validatePincode(formData.pincode)) {
        validationErrors.pincode = 'Invalid pincode. It should be a 6 digit number.';
      }
      if (file.length === 0) {

        // alert('All documents required')
  
        // return;
        validationErrors.doc = 'Please upload file';
      }
  
  
      setErrors(validationErrors);
  
      if (Object.keys(validationErrors).length > 0) {
        console.log('Validation failed:', validationErrors);
        return;
      }
  
      const requestData = new FormData();
      requestData.append('data', JSON.stringify(formData));
      if (file && file.length > 0) {
        requestData.append('pancardDoc', file[0]); // Assuming doc is an array of File objects
      }
      else { requestData.append('pancardDoc',file);}

      // requestData.append('pancardDoc', file);
      console.log("after",requestData);
  
      const response = await axios.post('http://localhost:9901/merchant/registerMerchant', requestData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Registration successful:', response.data);
      alert('Registration successful');
  
      // Add any additional logic for success (e.g., redirect to another page)
    // } else {
    //   // Handle the case where OCR did not return the expected result
    //   alert('OCR did not return the expected result.');
    // }
    } catch (error) {
      console.error('Error during OCR or registration:', error.response ? error.response.data : error.message);
      // Handle the error (e.g., show an error message to the user)
    }
  };
  

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '50px', marginTop: '50px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Registration</h2>
      <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Upload File */}
        <div style={{ width: '100%' }}>
          <label style={{ marginBottom: '5px', color: '#333' }}>Upload File:</label>
          <input
            type="file"
            onChange={(event) => { handleFileChange(event); }}
            style={{ width: '100%', padding: '8px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          {errors.uploadedFile && <span style={{ color: 'red' }}>{errors.uploadedFile}</span>}
        </div>

        {/* Name and Password */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
          <div style={{ width: '48%' }}>
            <label style={{ marginBottom: '5px', color: '#333' }}>First Name:</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          <div style={{ width: '48%' }}>
            <label style={{ marginBottom: '5px', color: '#333' }}>Password:</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
        </div>

        {/* Email */}
        <div style={{ width: '100%' }}>
          <label style={{ marginBottom: '5px', color: '#333' }}>Email:</label>
          <input
            type="text"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={{ width: '100%', padding: '8px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        {/* Phone */}
        <div style={{ width: '100%' }}>
          <label style={{ marginBottom: '5px', color: '#333' }}>Phone:</label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            style={{ width: '100%', padding: '8px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        {/* Street */}
        <div style={{ width: '100%' }}>
          <label style={{ marginBottom: '5px', color: '#333' }}>Street:</label>
          <input
            type="text"
            value={formData.street}
            onChange={(e) => setFormData({ ...formData, street: e.target.value })}
            style={{ width: '100%', padding: '8px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        {/* City and State */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
          <div style={{ width: '48%' }}>
            <label style={{ marginBottom: '5px', color: '#333' }}>City:</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          <div style={{ width: '48%' }}>
            <label style={{ marginBottom: '5px', color: '#333' }}>State:</label>
            <input
              type="text"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
        </div>

        {/* Country */}
        <div style={{ width: '100%' }}>
          <label style={{ marginBottom: '5px', color: '#333' }}>Country:</label>
          <input
            type="text"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            style={{ width: '100%', padding: '8px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        {/* Pincode */}
        <div style={{ width: '100%' }}>
          <label style={{ marginBottom: '5px', color: '#333' }}>Pincode:</label>
          <input
            type="text"
            value={formData.pincode}
            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
            style={{ width: '100%', padding: '8px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        {/* Merchant Type */}
        <div style={{ width: '100%' }}>
          <label style={{ marginBottom: '5px', color: '#333' }}>Merchant Type:</label>
          <select
            value={formData.merchantType}
            onChange={(e) => setFormData({ ...formData, merchantType: e.target.value })}
            style={{ width: '100%', padding: '8px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px' }}
          >
            <option value="">Select Merchant Type</option>
            <option value="RETAIL">Retail</option>
            <option value="NII">NII</option>
            <option value="QIB">QIB</option>
          </select>
        </div>

        {/* Error messages */}
        <Typography variant="body1" component="p" style={{ width: '100%', textAlign: 'center' }}>
          {errors.fullName && <span style={{ color: 'red' }}>{errors.fullName}</span>}
          {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
          {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
          {errors.phone && <span style={{ color: 'red' }}>{errors.phone}</span>}
          {errors.street && <span style={{ color: 'red' }}>{errors.street}</span>}
          {errors.city && <span style={{ color: 'red' }}>{errors.city}</span>}
          {errors.state && <span style={{ color: 'red' }}>{errors.state}</span>}
          {errors.country && <span style={{ color: 'red' }}>{errors.country}</span>}
          {errors.pincode && <span style={{ color: 'red' }}>{errors.pincode}</span>}
          {errors.merchantType && <span style={{ color: 'red' }}>{errors.merchantType}</span>}
          {errors.doc && <span style={{ color: 'red' }}>{errors.doc}</span>}
        </Typography>

        {/* Submit button and Already have an account link */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '15px' }}>
          <button
            type="submit"
            onClick={onSubmit}
            style={{
              width: '50%',
              padding: '10px',
              backgroundColor: '#4CAF50',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Submit
          </button>
          <Typography variant="body1" component="p" style={{ marginTop: '10px' }}>
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </div>

        {/* Dropzone */}
        {/* ... (your existing dropzone code) ... */}
      </form>
    </div>
  );
};

export default Registration;