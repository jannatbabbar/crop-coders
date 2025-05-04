import React, { useState } from 'react';
import axios from 'axios';
import { useFarmer } from '../context/FarmerContext';
 
export default function LoanOfferView({ offer }) {
  const [status, setStatus] = useState(null); // 'accepted' | 'rejected'
  const [contract, setContract] = useState(null); // Store the generated contract
  const [showPopup, setShowPopup] = useState(false); // Control popup visibility
  const {farmerId} = useFarmer();
 
  const handleDecision = async (decision) => {
    setStatus(decision);
 
    const url =
      decision === 'accepted'
        ? 'http://164.52.192.217:5000/farmer/accept-offer'
        : 'http://164.52.192.217:5000/farmer/reject-offer';
 
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ offer_id: offer.id }),
      });
 
      const result = await response.json();
      console.log(`${decision} result:`, result);
    } catch (error) {
      console.error(`Error while ${decision} offer:`, error);
    }
  };
 
  const handleGenerateContract = async () => {
    try {
      const response = await axios.post(
        'http://164.52.192.217:5000/cpu/request-ai-contract',
        { farmer_id: farmerId }
        // {
        //   headers: { 'Content-Type': 'application/json' },
        // }
      );
      setContract(response.data.ai_contract); // Assuming the API returns the contract in response.data.contract
      setShowPopup(true); // Show the popup with the contract
    } catch (error) {
      console.error('Error generating AI contract:', error);
    }
  };

 
  return (
    <div style={styles.card}>
      <h3 style={styles.heading}>Loan Offer</h3>
      <p><strong>Lender Name:</strong> {offer.lenderName}</p>
      <p><strong>Loan Amount:</strong> ₹{offer.amount}</p>
      <p><strong>Interest Rate:</strong> {offer.interestRate}</p>
      <p><strong>Duration:</strong> {offer.duration}</p>
 
      {status === 'accepted' ? (
        <div>
          <p style={styles.accepted}>Offer accepted.</p>
          <button onClick={handleGenerateContract} style={styles.generateBtn}>
            Generate AI Contract
          </button>
        </div>
      ) : status === 'rejected' ? (
        <p style={styles.rejected}>Offer rejected.</p>
      ) : (
        <div style={styles.buttonGroup}>
          <button onClick={() => handleDecision('accepted')} style={styles.acceptBtn}>
            Accept
          </button>
          <button onClick={() => handleDecision('rejected')} style={styles.rejectBtn}>
            Reject
          </button>
        </div>
      )}
 
      {/* Popup to display the contract */}
      {showPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <h3>Generated AI Contract</h3>
            <pre style={styles.contractText}>{contract}</pre>
            <button onClick={() => setShowPopup(false)} style={styles.closeBtn}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
 
const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    marginBottom: '10px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  acceptBtn: {
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  rejectBtn: {
    backgroundColor: '#dc3545',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  accepted: {
    color: 'green',
    fontWeight: 'bold',
  },
  rejected: {
    color: 'red',
    fontWeight: 'bold',
  },
  generateBtn: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
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
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    width: '80%',
    maxWidth: '600px',
  },
  contractText: {
    backgroundColor: '#f9f9f9',
    padding: '10px',
    borderRadius: '5px',
    textAlign: 'left',
    whiteSpace: 'pre-wrap',
    maxHeight: '300px',
    overflowY: 'auto',
  },
  closeBtn: {
    backgroundColor: '#dc3545',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};