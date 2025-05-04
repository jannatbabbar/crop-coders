import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Microphone from '../Microphone';

export default function CreditOptions() {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  // Handle option selection
  const handleSelectOption = (option) => {
    setSelectedOption(option);
    if (option === 'Generate credit score') {
      navigate('/farmer/credit-score'); // <-- navigate to the CreditScore route
    }
    else if (option == 'Loan Recommendations'){
      navigate('/farmer/loan-recommendations');
    }
    else if (option == 'Request a Loan'){
      navigate('/farmer/request-loan');
    }
    else if (option == 'View Offers'){
      navigate('/farmer/view-offers');
    }
  }

  // Handle audio input (simplified for demonstration)
  const handleAudioInput = (event) => {
    const audio = event.target.files[0];
    if (audio) {
      console.log('Audio file selected:', audio.name);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Credit Management Options</h2>
      <div style={styles.buttonContainer}>
        <button
          style={styles.button}
          onClick={() => handleSelectOption('Generate credit score')}
        >
          Generate Credit Score
        </button>
        <button
          style={styles.button}
          onClick={() => handleSelectOption('Loan Recommendations')}
        >
          Get Loan Recommendations
        </button>
        <button
          style={styles.button}
          onClick={() => handleSelectOption('Request a Loan')}
        >
          Request a Loan
        </button>
        <button
          style={styles.button}
          onClick={() => handleSelectOption('View Offers')}
        >
          View Loan Offers
        </button>
        <Microphone />
      </div>
      {selectedOption && (
        <p style={styles.selectedOption}>
          You have selected: {selectedOption}
        </p>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: '300px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    textAlign: 'center',
    fontFamily: 'sans-serif',
    backgroundColor: '#f9f9f9',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  audioContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  audioLabel: {
    fontSize: '16px',
    marginBottom: '10px',
  },
  audioInput: {
    display: 'none',
  },
  selectedOption: {
    marginTop: '20px',
    fontSize: '16px',
    color: '#333',
  },
};
