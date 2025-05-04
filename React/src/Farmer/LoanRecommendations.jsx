import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFarmer } from '../context/FarmerContext';
 
export default function LoanRecommendations() {
  const [recommendedLoanAmount, setRecommendedLoanAmount] = useState('');
  const [recommendedInterestRate, setRecommendedInterestRate] = useState('');
  const [eligibleInterestRateRange, setEligibleInterestRateRange] = useState('');
  const [eligibleLoanAmountRanges, setEligibleLoanAmountRanges] = useState({});
  const [eligibleSchemes, setEligibleSchemes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  const { farmerId } = useFarmer();
 
  useEffect(() => {
    const fetchLoanRecommendations = async () => {
      try {
        const response = await axios.post('http://164.52.192.217:5000/cpu/get-loan-recommendation', {
          farmer_id: farmerId,
        });

        if (response.status === 200) {
          const {
            recommended_loan_amount,
            recommended_interest_rate,
            eligible_interest_range,
            loan_amount_ranges,
            eligible_schemes,
          } = response.data;

          setRecommendedLoanAmount(recommended_loan_amount);
          setRecommendedInterestRate(recommended_interest_rate);
          setEligibleInterestRateRange(eligible_interest_range);
          setEligibleLoanAmountRanges(loan_amount_ranges);
          setEligibleSchemes(eligible_schemes);
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
      fetchLoanRecommendations();
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
        <>
          {/* Recommended Loan Details Card */}
          <div style={styles.card}>
            <h3 style={styles.cardHeading}>Best Recommended Loan</h3>
            <p><strong>Recommended Loan Amount:</strong> ₹{recommendedLoanAmount}</p>
            <p><strong>Recommended Interest Rate:</strong> {recommendedInterestRate}</p>
          </div>
   
          {/* Eligible Loan Details Card */}
          <div style={styles.card}>
            <h3 style={styles.cardHeading}>Eligible Loan Details</h3>
            <p><strong>Eligible Interest Rate Range:</strong> {eligibleInterestRateRange}</p>
            <p><strong>Eligible Loan Amount Ranges:</strong></p>
            <ul>
              {Object.entries(eligibleLoanAmountRanges).map(([label, amount], index) => (
                <li key={index}><strong>{label}:</strong> ₹{amount}</li>
              ))}
            </ul>

            <h4>Government Schemes</h4>
            {eligibleSchemes?.by_government?.length > 0 ? (
              <ul>
                {eligibleSchemes.by_government.map((scheme, index) => (
                  <li key={index}>{scheme}</li>
                ))}
              </ul>
            ) : (
              <p>No government schemes available.</p>
            )}

            <h4>Bank Schemes</h4>
            {eligibleSchemes?.by_banks?.length > 0 ? (
              <ul>
                {eligibleSchemes.by_banks.map((scheme, index) => (
                  <li key={index}>{scheme}</li>
                ))}
              </ul>
            ) : (
              <p>No bank schemes available.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
 
const styles = {
  container: {
    maxWidth: '800px',
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
    marginBottom: '20px',
  },
  cardHeading: {
    marginBottom: '15px',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  range: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  loanOption: {
    marginBottom: '15px',
  },
  divider: {
    margin: '10px 0',
    border: 'none',
    borderTop: '1px solid #ddd',
  },
};
