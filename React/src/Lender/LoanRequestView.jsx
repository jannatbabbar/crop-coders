import React, { useState } from 'react';

export default function LoanRequestView({ request, onDecision }) {
  const [status, setStatus] = useState('Pending Review');

  if (!request) {
    return (
      <div style={styles.container}>
        <p style={styles.message}>No loan request found.</p>
      </div>
    );
  }

  const handleDecision = (decision) => {
    setStatus(decision);
    if (onDecision) onDecision(decision);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Farmer Loan Request</h2>
      <div style={styles.card}>
        <p><strong>Farmer Name:</strong> {request.name || 'Unknown'}</p>
        <p><strong>Location:</strong> {request.location || 'Not provided'}</p>
        <p><strong>Requested Amount:</strong> ₹{request.amount}</p>
        <p><strong>Preferred Interest Rate:</strong> {request.interestRange}</p>
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
};
