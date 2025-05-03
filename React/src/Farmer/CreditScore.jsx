import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFarmer } from '../context/FarmerContext.jsx';

export default function FarmerCreditScore() {
  const [creditScore, setCreditScore] = useState(null);
  const [rating, setRating] = useState('N/A');
  const [lastUpdated, setLastUpdated] = useState('N/A');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const farmerId = useFarmer.farmerId;

  // Fetch credit score when component mounts
  useEffect(() => {
    const fetchCreditScore = async () => {
      try {
        const response = await axios.post('http://localhost:5000/cpu/get-credit-score', {
          farmer_id: farmerId,
        });
  
        if (response.status === 200) {
          const { credit_score } = response.data;
  
          // Set the rating based on the new credit score ranges
          let rating;
          if (credit_score > 800) {
            rating = 'Excellent Credit Score';
          } else if (credit_score >= 740 && credit_score <= 799) {
            rating = 'Very Good Credit Score';
          } else if (credit_score >= 670 && credit_score <= 739) {
            rating = 'Good Credit Score';
          } else if (credit_score >= 580 && credit_score <= 669) {
            rating = 'Fair Credit Score';
          } else {
            rating = 'Credit Score Needs Improvement';
          }
  
          // Update the state
          setCreditScore(credit_score);
          setRating(rating);
          setLastUpdated(new Date().toLocaleDateString());
        } else {
          setError('Failed to fetch credit score: Farmer not found');
        }
        setLoading(false);
      } catch (err) {
        setError('An error occurred while fetching the credit score');
        setLoading(false);
      }
    };
  
    fetchCreditScore();
  }, [farmerId]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Farmer Credit Score</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div style={styles.card}>
          <p><strong>Credit Score:</strong> <span style={styles.score}>{creditScore}</span></p>
          <p><strong>Rating:</strong> {rating}</p>
          <p><small>Last Updated: {lastUpdated}</small></p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '80px auto',
    padding: '20px',
    fontFamily: 'sans-serif',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '30px',
  },
  card: {
    backgroundColor: '#f4f4f4',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  score: {
    color: '#2e7d32',
    fontSize: '20px',
    fontWeight: 'bold',
  },
};
