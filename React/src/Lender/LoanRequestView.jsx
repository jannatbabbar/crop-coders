import React, { useState } from 'react';
import axios from 'axios';
import { useLender } from '../context/LenderContext';
 
export default function LoanRequestView({ request, onDecision }) {
  const [status, setStatus] = useState('Pending Review');
  const [showPopup, setShowPopup] = useState(false);
  const [interestRate, setInterestRate] = useState('');
  const {lenderId} = useLender();
 
  if (!request) {
    return (
      <div style={styles.container}>
        <p style={styles.message}>No loan request found.</p>
      </div>
    );
  }
 
  const handleDecision = async (decision) => {
    if (decision === 'Approved') {
      setShowPopup(true); // Show popup for interest rate input
    } else {
      setStatus(decision);
      if (onDecision) onDecision(decision);
    }
  };
 
  const handleSubmitInterestRate = async () => {
    try {
      // API call to update the farmer's database
      await axios.post('http://164.52.192.217:5000/lender/send-offer', {
        //lenderId
        lender_id: lenderId,
        loan_request_id: request.loan_request_id,
        farmer_id: request.farmer_id,
        offered_interest_rate: interestRate,
      });
 
      setStatus('Approved');
      setShowPopup(false);
      if (onDecision) onDecision('Approved');
    } catch (error) {
      console.error('Error updating loan offer:', error);
      alert('Failed to update loan offer. Please try again.');
    }
  };
 
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Farmer Loan Request</h2>
      <div style={styles.card}>
        <p><strong>Farmer Name:</strong> {request.farmer_name || 'Unknown'}</p>
        <p><strong>Requested Amount:</strong> ₹{request.loan_amount}</p>
        <p><strong>Preferred Interest Rate:</strong> {request.interest_rate}</p>
        <p><strong>Loan Duration:</strong> {request.duration}</p>
        <p>
          <strong>Status:</strong>{' '}
          <span style={statusStyles[status] || styles.status}>{status}</span>
        </p>
 
        {status === 'Pending Review' && (
          <div style={styles.buttonGroup}>
            <button style={styles.approveBtn} onClick={() => handleDecision('Approved')}>
              Approve
            </button>
            <button style={styles.rejectBtn} onClick={() => handleDecision('Rejected')}>
              Reject
            </button>
          </div>
        )}
      </div>
 
      {/* Popup for entering interest rate */}
      {showPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <h3>Enter Final Interest Rate</h3>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="Enter interest rate"
              style={styles.input}
            />
            <div style={styles.popupButtons}>
              <button style={styles.submitBtn} onClick={handleSubmitInterestRate}>
                Submit
              </button>
              <button style={styles.cancelBtn} onClick={() => setShowPopup(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
 
const statusStyles = {
  Approved: { color: 'green', fontWeight: 'bold' },
  Rejected: { color: 'red', fontWeight: 'bold' },
  'Pending Review': { color: '#ff9800', fontWeight: 'bold' },
};
 
const styles = {
  container: {
    maxWidth: '500px',
    margin: '60px auto',
    padding: '30px',
    fontFamily: 'sans-serif',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '20px',
  },
  card: {
    backgroundColor: '#f3f3f3',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    textAlign: 'left',
  },
  buttonGroup: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  approveBtn: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  rejectBtn: {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  message: {
    color: '#888',
    fontSize: '16px',
  },
  popupOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  },
  input: {
    width: '80%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  popupButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  submitBtn: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  cancelBtn: {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};
 
 