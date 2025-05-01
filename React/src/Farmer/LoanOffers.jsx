import React, { useState } from 'react';
import LoanOfferView from './LoanOfferView';

export default function LoanOffers() {
  const [offers, setOffers] = useState([
    {
      id: 1,
      lenderName: 'Ms Pooja Sharma',
      lenderLocation: 'Delhi',
      amount: '75000',
      interestRate: '6%',
      duration: '18 months',
    },
    {
      id: 2,
      lenderName: 'Mr Ashok Singh',
      lenderLocation: 'Bangalore',
      amount: '100000',
      interestRate: '5.5%',
      duration: '24 months',
    },
    {
      id: 3,
      lenderName: 'Mr Venkatesh Gopal',
      lenderLocation: 'Lucknow',
      amount: '50000',
      interestRate: '7%',
      duration: '12 months',
    },
  ]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Your Loan Offers</h2>
      {offers.length === 0 ? (
        <p style={styles.message}>No offers available at the moment.</p>
      ) : (
        offers.map((offer) => (
          <LoanOfferView key={offer.id} offer={offer} />
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '900px',
    margin: '40px auto',
    padding: '20px',
    fontFamily: 'sans-serif',
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  message: {
    textAlign: 'center',
    color: '#777',
  },
};
