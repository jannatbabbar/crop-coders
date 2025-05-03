import React, { useState } from 'react';
import axios from 'axios';
import { useFarmer } from '../context/FarmerContext';

export default function LoanRequestForm() {
  const [amount, setAmount] = useState('');
  const [interestRange, setInterestRange] = useState('');
  const [duration, setDuration] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const farmerId = useFarmer.farmerId; 

  const parseInterestRate = (input) => {
    const matches = input.match(/\d+(\.\d+)?/g); // Extract numbers like 4 or 4.5
    if (!matches || matches.length === 0) return null;
    const average = matches.reduce((sum, val) => sum + parseFloat(val), 0) / matches.length;
    return average.toFixed(2);
  };

  const parseDurationToMonths = (input) => {
    input = input.toLowerCase().trim();
    if (input.includes('year')) {
      const years = parseFloat(input);
      return Math.round(years * 12);
    } else if (input.includes('month')) {
      return parseInt(input);
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!amount || !interestRange || !duration) {
      alert('Please fill all fields.');
      return;
    }

    const parsedInterest = parseInterestRate(interestRange);
    const parsedDuration = parseDurationToMonths(duration);

    if (!parsedInterest || !parsedDuration || !farmerId) {
      setError('Invalid input. Please enter valid interest and duration, and ensure farmer is logged in.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/farmer/request-loan', {
        farmer_id: farmerId,
        amount: parseInt(amount),
        interest_rate: parseFloat(parsedInterest),
        duration: parsedDuration,
      });

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError('Failed to submit the loan request.');
    }
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
            Maximum Interest Rate:
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

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button type="submit" style={styles.button}>Submit Request</button>
        </form>
      ) : (
        <div style={styles.summary}>
          <h3>Loan Request Summary</h3>
          <p><strong>Amount:</strong> ₹{amount}</p>
          <p><strong>Maximum Interest Rate:</strong> {interestRange}</p>
          <p><strong>Duration:</strong> {duration}</p>
          <p>Your request has been submitted successfully.</p>
        </div>
      )}
    </div>
  );
}

// Styles remain unchanged
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
