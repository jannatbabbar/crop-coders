import React, { useState } from 'react';

export default function LoanOfferView({ offer }) {
  const [status, setStatus] = useState(null); // 'accepted' | 'rejected'

  const handleDecision = (decision) => {
    setStatus(decision);
    // Optional: call API or notify parent here
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.heading}>Loan Offer</h3>
      <p><strong>Lender Name:</strong> {offer.lenderName}</p>
      <p><strong>Lender Location:</strong> {offer.lenderLocation}</p>
      <p><strong>Loan Amount:</strong> ₹{offer.amount}</p>
      <p><strong>Interest Rate:</strong> {offer.interestRate}</p>
      <p><strong>Duration:</strong> {offer.duration}</p>

      {status ? (
        <p style={status === 'accepted' ? styles.accepted : styles.rejected}>
          Offer {status}.
        </p>
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
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#f0f8ff',
    padding: '20px',
    margin: '15px auto',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    fontFamily: 'sans-serif',
    maxWidth: '500px',
  },
  heading: {
    marginBottom: '10px',
    color: '#004085',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    marginTop: '15px',
    justifyContent: 'center',
  },
  acceptBtn: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  rejectBtn: {
    backgroundColor: '#dc3545',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  accepted: {
    marginTop: '10px',
    color: '#28a745',
    fontWeight: 'bold',
  },
  rejected: {
    marginTop: '10px',
    color: '#dc3545',
    fontWeight: 'bold',
  },
};
