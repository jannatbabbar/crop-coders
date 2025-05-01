import React, { useState } from 'react';
import LoanRequestView from './LoanRequestView';

export default function LoanRequests() {
  const [loanRequests, setLoanRequests] = useState([
    {
      id: 1,
      name: 'Ravi Kumar',
      location: 'Maharashtra',
      amount: '100000',
      interestRange: '5% - 8%',
      duration: '24 months',
    },
    {
      id: 2,
      name: 'Anita Sharma',
      location: 'Punjab',
      amount: '75000',
      interestRange: '6% - 9%',
      duration: '18 months',
    },
    {
      id: 3,
      name: 'Rahul Yadav',
      location: 'Uttar Pradesh',
      amount: '120000',
      interestRange: '4% - 7%',
      duration: '36 months',
    },
  ]);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Open Loan Requests</h1>
      {loanRequests.length === 0 ? (
        <p>No loan requests found.</p>
      ) : (
        loanRequests.map((request) => (
          <div key={request.id} style={styles.cardWrapper}>
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
};
