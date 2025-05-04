import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleFarmerClick = () => {
    navigate('/farmer/login');
  };

  const handleLenderClick = () => {
    navigate('/lender/login');
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Crop Coders</h1>
      <p className="home-question">Are you a Farmer or a Lender?</p>
      <div className="home-buttons">
        <button className="home-button farmer-button" onClick={handleFarmerClick}>
          Farmer
        </button>
        <button className="home-button lender-button" onClick={handleLenderClick}>
          Lender
        </button>
      </div>
    </div>
  );
};

export default HomePage;