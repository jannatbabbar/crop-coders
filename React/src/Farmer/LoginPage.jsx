import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';
import { useFarmer } from '../context/FarmerContext.jsx';

const LoginPage = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');

  const handleMobileSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/cpu/farmer-login', {
        mobile_number: mobileNumber,
      });
      setStep(2);
      setMessage('OTP sent. Please enter the OTP');
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error sending OTP');
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/cpu/farmer-verify-otp', {
        mobile_number: mobileNumber,
        otp: otp,
      });
      const { token, farmer_id } = response.data;
      setMessage(`Login successful! Farmer ID: ${farmer_id}`);
      useFarmer.setFarmerId(farmer_id);
      navigate('/farmer/dashboard');
    } catch (error) {
      setMessage(error.response?.data?.error || 'Invalid OTP');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Farmer Login</h2>

      {step === 1 && (
        <div>
          <label className="login-label">Mobile Number</label>
          <input
            type="text"
            className="login-input"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="Enter mobile number"
          />
          <button
            onClick={handleMobileSubmit}
            className="login-button send-otp-btn"
          >
            Send OTP
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <label className="login-label">OTP</label>
          <input
            type="text"
            className="login-input"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
          />
          <button
            onClick={handleOtpSubmit}
            className="login-button verify-otp-btn"
          >
            Verify OTP
          </button>
        </div>
      )}

      {message && <p className="login-message">{message}</p>}
    </div>
  );
};

export default LoginPage;
