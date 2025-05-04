import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';
import { useFarmer } from '../context/FarmerContext.jsx';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const LoginPageFarmer = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');
  const { setFarmerId, setFarmerName, setFarmerState, setFarmerDistrict } = useFarmer();
  const navigate = useNavigate();

  const handleMobileSubmit = async () => {
    try {
      const response = await axios.post('http://164.52.192.217:5000/cpu/farmer-login', {
        mobile_number: mobileNumber,
      });
      const otpReceived  = response.data.otp;
      setOtp(otpReceived)
      setStep(2);
      setMessage('OTP sent. Please enter the OTP');
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error sending OTP');
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const response = await axios.post('http://164.52.192.217:5000/cpu/farmer-verify-otp', {
        mobile_number: mobileNumber,
        otp: otp,
      });
      const { farmer_id, farmer_name, state, district } = response.data;
      setMessage(`Login successful! Farmer ID: ${farmer_id}`);
      setFarmerId(farmer_id);
      setFarmerName(farmer_name);
      setFarmerState(state);
      setFarmerDistrict(district);
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

export default LoginPageFarmer;
