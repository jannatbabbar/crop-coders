import React, { useState } from 'react';

export default function LoanRequestForm() {
  const [amount, setAmount] = useState('');
  const [interestRange, setInterestRange] = useState('');
  const [duration, setDuration] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || !interestRange || !duration) {
      alert('Please fill all fields.');
      return;
    }

    setSubmitted(true);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Loan Request Form</h2>

      {!submitted ? (
        <form onSubmit={handleSubmit} style={styles.form}>
          <label>
            Loan Amount (₹):
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={styles.input}
              min="1000"
            />
          </label>

          <label>
            Preferred Interest Rate Range (%):
            <input
              type="text"
              placeholder="e.g. 4% - 8%"
              value={interestRange}
              onChange={(e) => setInterestRange(e.target.value)}
              style={styles.input}
            />
          </label>

          <label>
            Loan Duration:
            <input
              type="text"
              placeholder="e.g. 12 months or 2 years"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              style={styles.input}
            />
          </label>

          <button type="submit" style={styles.button}>Submit Request</button>
        </form>
      ) : (
        <div style={styles.summary}>
          <h3>Loan Request Summary</h3>
          <p><strong>Amount:</strong> ₹{amount}</p>
          <p><strong>Interest Rate Range:</strong> {interestRange}</p>
          <p><strong>Duration:</strong> {duration}</p>
          <p>Your request has been submitted successfully.</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '60px auto',
    padding: '30px',
    fontFamily: 'sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '25px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginTop: '5px',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  summary: {
    textAlign: 'center',
    lineHeight: '1.6',
  },
};
