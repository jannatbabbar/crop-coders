import React from 'react';

export default function LoanRecommendations() {
  // Mock data
  const farmer = {
    name: 'Ravi Kumar',
    location: 'Maharashtra, India',
    recommendedLoanRange: '₹50,000 – ₹2,00,000',
    governmentSchemes: [
      {
        name: 'Kisan Credit Card (KCC)',
        description: 'Provides timely credit to farmers for their cultivation and other needs with low interest.',
      },
      {
        name: 'PM-KISAN',
        description: 'Income support scheme for small and marginal farmers offering ₹6,000/year directly to their bank accounts.',
      },
      {
        name: 'NABARD Agriculture Loan',
        description: 'Refinancing support for banks providing loans to farmers for farm development and allied activities.',
      },
    ],
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Loan Recommendations</h2>
      <div style={styles.card}>
        <p><strong>Name:</strong> {farmer.name}</p>
        <p><strong>Location:</strong> {farmer.location}</p>
        <p><strong>Recommended Loan Range:</strong> <span style={styles.range}>{farmer.recommendedLoanRange}</span></p>

        <h3 style={styles.subHeading}>Eligible Government Schemes</h3>
        <ul style={styles.schemeList}>
          {farmer.governmentSchemes.map((scheme, index) => (
            <li key={index} style={styles.schemeItem}>
              <strong>{scheme.name}</strong>
              <p style={styles.schemeDesc}>{scheme.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '60px auto',
    padding: '20px',
    fontFamily: 'sans-serif',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '20px',
  },
  subHeading: {
    marginTop: '30px',
    fontSize: '18px',
    textAlign: 'left',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    padding: '25px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    textAlign: 'left',
  },
  range: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  schemeList: {
    listStyleType: 'none',
    paddingLeft: '0',
  },
  schemeItem: {
    marginBottom: '20px',
    borderBottom: '1px solid #ddd',
    paddingBottom: '10px',
  },
  schemeDesc: {
    margin: '5px 0 0',
    fontSize: '14px',
    color: '#555',
  },
};
