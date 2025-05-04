import React, { useState } from 'react';
import axios from 'axios';
import '../Farmer/LoginPage.css';
import { useLender } from '../context/LenderContext.jsx';
import { useNavigate } from 'react-router-dom';


const LoginPageLender = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');
  const {setLenderId, setLenderState} = useLender();
  const navigate = useNavigate();

  const handleMobileSubmit = async () => {
    try {
      const response = await axios.post('http://164.52.192.217:5000/cpu/lender-login', {
        mobile_number: mobileNumber
      });
      setStep(2);
      const otpReceived  = response.data.otp;
      setOtp(otpReceived)
      setMessage('OTP sent. Please enter the OTP');
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error sending OTP');
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const response = await axios.post('http://164.52.192.217:5000/cpu/lender-verify-otp', {
        mobile_number: mobileNumber,
        otp: otp,
      });
      console.log(response);
      const { lender_id, state  } = response.data;
      setMessage(`Login successful! lender ID: ${lender_id}`);
      setLenderId(lender_id);
      setLenderState(state);
      navigate('/lender/loan-requests');
    } catch (error) {
      setMessage(error.response?.data?.error || 'Invalid OTP');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Lender Login</h2>

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

export default LoginPageLender;
