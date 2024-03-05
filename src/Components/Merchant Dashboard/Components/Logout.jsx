import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Logout = () => {

    const navigate = useNavigate();
    const handleLogout = () => {
        
        // Remove token from local storage
        localStorage.removeItem('token');
    
        // Redirect to the home page
        navigate('/');
      };
      useEffect(() => {
        // Call handleLogout when the component is mounted
        handleLogout();
      }, []);

  return (
    <div>
      Logout ...
    </div>
  )
}

export default Logout
