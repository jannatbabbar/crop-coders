import React, { useState, useEffect } from 'react';
import LoanOfferView from './LoanOfferView';
import { useFarmer } from '../context/FarmerContext';
import axios from 'axios';

export default function LoanOffers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Replace this with the actual farmer ID as needed
  const {farmerId} = useFarmer();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.post(
          'http://164.52.192.217:5000/farmer/view-offers',
          { farmer_id: farmerId }
        );
        const data = response.data.map((offer) => ({
          id: offer.offer_id,
          lenderName: offer.lender_name,
          amount: offer.amount,
          interestRate: `${offer.interest_rate}%`,
          duration: `${offer.duration} months`,
          lender_id: offer.lender_id
        }));
        setOffers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching loan offers:', error);
        setLoading(false);
      }
    };

    fetchOffers();
  }, [farmerId]);

  if (loading) {
    return <p>Loading loan offers...</p>;
  }

  if (offers.length === 0) {
    return <p>No loan offers available.</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Your Loan Offers</h2>
      {loading ? (
        <p style={styles.message}>Loading offers...</p>
      ) : offers.length === 0 ? (
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
