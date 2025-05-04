import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoanRequestView from './LoanRequestView';
import { useLender } from '../context/LenderContext.jsx';
 
// LoanRequest class definition
class LoanRequest {
  constructor(loan_request_id, farmer_name, loan_amount, interest_rate, duration, farmer_id) {
    this.loan_request_id = loan_request_id;
    this.farmer_name = farmer_name;
    this.loan_amount = loan_amount;
    this.interest_rate = interest_rate;
    this.duration = duration;
    this.farmer_id = farmer_id;
  }
}
 
export default function LoanRequests() {
  const [loanRequests, setLoanRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {lenderState} = useLender();
 
  useEffect(() => {
    const fetchLoanRequests = async () => {
      try {
        const response = await axios.post('http://164.52.192.217:5000/lender/loan-requests-by-region', {
          //add region in lender context
          region: lenderState,
        });
        console.log(response);
        const loanRequestsData = response.data.map(
          (request) =>
            new LoanRequest(
              request.loan_request_id,
              request.farmer_name,
              request.loan_amount,
              request.interest_rate,
              request.duration,
              request.farmer_id
            )
        );
        setLoanRequests(loanRequestsData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch loan requests. Please try again later.');
        setLoading(false);
      }
    };
 
    fetchLoanRequests();
  }, []);
 
  if (loading) {
    return <div style={styles.container}><p>Loading loan requests...</p></div>;
  }
 
  if (error) {
    return <div style={styles.container}><p style={styles.error}>{error}</p></div>;
  }
 
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Open Loan Requests</h1>
      {loanRequests.length === 0 ? (
        <p>No loan requests found.</p>
      ) : (
        loanRequests.map((request) => (
          <div key={request.loan_request_id} style={styles.cardWrapper}>
            <LoanRequestView request={request} />
          </div>
        ))
      )}
    </div>
  );
}
 
const styles = {
  container: {
    maxWidth: '900px',
    margin: '50px auto',
    padding: '20px',
    fontFamily: 'sans-serif',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  cardWrapper: {
    marginBottom: '40px',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
};