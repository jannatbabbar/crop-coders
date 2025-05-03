import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFarmer } from '../context/FarmerContext';

export default function LoanRecommendations() {
  const [loanRecommendation, setLoanRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const farmerId = useFarmer.farmerId;

  useEffect(() => {
    const fetchLoanRecommendation = async () => {
      try {
        const response = await axios.post('http://localhost:5000/cpu/get-loan-recommendation', {
          farmer_id: farmerId,
        });

        if (response.status === 200) {
          const { loan_type, interest_rate, recommended_amount } = response.data;
          setLoanRecommendation({
            loanType: loan_type,
            interestRate: interest_rate,
            recommendedAmount: recommended_amount,
          });
        } else {
          setError('Failed to fetch loan recommendations');
        }
      } catch (err) {
        setError('An error occurred while fetching the loan recommendations');
      } finally {
        setLoading(false);
      }
    };

    if (farmerId) {
      fetchLoanRecommendation();
    } else {
      setLoading(false);
      setError('Farmer ID is missing');
    }
  }, [farmerId]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Loan Recommendations</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div style={styles.card}>
          <p><strong>Loan Type:</strong> {loanRecommendation?.loanType}</p>
          <p><strong>Recommended Interest Rate:</strong> {loanRecommendation?.interestRate}%</p>
          <p><strong>Recommended Loan Amount:</strong> <span style={styles.range}>{loanRecommendation?.recommendedAmount}</span></p>

          {/* You can add more details like government schemes, if necessary */}
        </div>
      )}
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
};
