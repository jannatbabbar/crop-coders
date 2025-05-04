import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFarmer } from '../context/FarmerContext.jsx';

export default function FarmerCreditScore() {
  const [creditScore, setCreditScore] = useState(null);
  const [ratingEn, setRatingEn] = useState('N/A');
  const [ratingPa, setRatingPa] = useState('N/A');
  const [lastUpdated, setLastUpdated] = useState('N/A');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { farmerId, farmerName, farmerState, farmerDistrict } = useFarmer();

  useEffect(() => {
    const fetchCreditScore = async () => {
      try {
        const response = await axios.post('http://164.52.192.217:5000/cpu/get-credit-score', {
          farmer_id: farmerId,
        });

        if (response.status === 200) {
          const { credit_score } = response.data;

          // English
          let enRating;
          if (credit_score > 800) enRating = 'Excellent Credit Score';
          else if (credit_score >= 740) enRating = 'Very Good Credit Score';
          else if (credit_score >= 670) enRating = 'Good Credit Score';
          else if (credit_score >= 580) enRating = 'Fair Credit Score';
          else enRating = 'Credit Score Needs Improvement';

          // Punjabi
          let paRating;
          if (credit_score > 800) paRating = 'ਉਤਮ ਕਰੈਡਿਟ ਸਕੋਰ';
          else if (credit_score >= 740) paRating = 'ਬਹੁਤ ਵਧੀਆ ਕਰੈਡਿਟ ਸਕੋਰ';
          else if (credit_score >= 670) paRating = 'ਚੰਗਾ ਕਰੈਡਿਟ ਸਕੋਰ';
          else if (credit_score >= 580) paRating = 'ਠੀਕ ਕਰੈਡਿਟ ਸਕੋਰ';
          else paRating = 'ਕਰੈਡਿਟ ਸਕੋਰ ਸੁਧਾਰ ਦੀ ਲੋੜ ਹੈ';

          setCreditScore(credit_score);
          setRatingEn(enRating);
          setRatingPa(paRating);
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

  const CreditCard = ({ title, creditScore, rating, lastUpdated, labels }) => (
    <div style={styles.card}>
      <h3>{title}</h3>
      <p>
        <strong>{labels.infoPrefix} {farmerName} {labels.from} {farmerDistrict}, {farmerState}:</strong>{' '}
        <span style={styles.score}>{creditScore}</span>
      </p>
      <p>
        <strong>{labels.score}:</strong>{' '}
        <span style={styles.score}>{creditScore}</span>
      </p>
      <p>
        <strong>{labels.rating}:</strong> {rating}
      </p>
      <p>
        <small>{labels.updated}: {lastUpdated}</small>
      </p>
    </div>
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Farmer Credit Score</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div style={styles.cardContainer}>
          <CreditCard
            title="English"
            creditScore={creditScore}
            rating={ratingEn}
            lastUpdated={lastUpdated}
            labels={{
              infoPrefix: "The Credit Score for",
              from: "from",
              score: "Credit Score",
              rating: "Rating",
              updated: "Last Updated",
            }}
          />

          <CreditCard
            title="ਪੰਜਾਬੀ"
            creditScore={creditScore}
            rating={ratingPa}
            lastUpdated={lastUpdated}
            labels={{
              infoPrefix: "ਕਰੈਡਿਟ ਸਕੋਰ",
              from: "ਦੇ",
              score: "ਕਰੈਡਿਟ ਸਕੋਰ",
              rating: "ਰੇਟਿੰਗ",
              updated: "ਆਖਰੀ ਵਾਰ ਅੱਪਡੇਟ ਕੀਤਾ",
            }}
          />
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '900px',
    margin: '80px auto',
    padding: '20px',
    fontFamily: 'sans-serif',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '30px',
  },
  cardContainer: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  card: {
    flex: '1',
    minWidth: '350px',
    backgroundColor: '#f4f4f4',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    textAlign: 'left',
  },
  score: {
    color: '#2e7d32',
    fontSize: '20px',
    fontWeight: 'bold',
  },
};
