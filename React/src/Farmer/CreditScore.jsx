import React from 'react';

export default function FarmerCreditScore() {
  // Mock data
  const farmer = {
    name: 'Ravi Kumar',
    location: 'Maharashtra, India',
    creditScore: 728,
    rating: 'Good',
    lastUpdated: 'April 28, 2025',
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Farmer Credit Score</h2>
      <div style={styles.card}>
        <p><strong>Name:</strong> {farmer.name}</p>
        <p><strong>Location:</strong> {farmer.location}</p>
        <p><strong>Credit Score:</strong> <span style={styles.score}>{farmer.creditScore}</span></p>
        <p><strong>Rating:</strong> {farmer.rating}</p>
        <p><small>Last Updated: {farmer.lastUpdated}</small></p>
      </div>
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
