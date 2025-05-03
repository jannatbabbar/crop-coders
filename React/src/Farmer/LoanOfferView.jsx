import React, { useState } from 'react';

export default function LoanOfferView({ offer }) {
  const [status, setStatus] = useState(null); // 'accepted' | 'rejected'

  const handleDecision = async (decision) => {
    setStatus(decision);

    const url =
      decision === 'accepted'
        ? 'http://localhost:5000/farmer/accept-offer'
        : 'http://localhost:5000/farmer/reject-offer';

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

  return (
    <div style={styles.card}>
      <h3 style={styles.heading}>Loan Offer</h3>
      <p><strong>Lender Name:</strong> {offer.lenderName}</p>
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
