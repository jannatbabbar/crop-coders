import { useState } from 'react'
import './App.css'
import LoginPage from './Farmer/LoginPage'
import FarmerLanding from './Farmer/FarmerLanding'
import CreditScore from './Farmer/CreditScore'
import LoanRecommendations from './Farmer/LoanRecommendations'
import RequestLoan from './Farmer/RequestLoan'
import LoanRequestView from './Lender/LoanRequestView'
import LoanRequests from './Lender/LoanRequests'
import LoanOffers from './Farmer/LoanOffers'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const loanRequest = {
    name: 'Ravi Kumar',
    location: 'Maharashtra, India',
    amount: '100000',
    interestRange: '5% - 8%',
    duration: '24 months',
  };
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<FarmerLanding />} />
        <Route path="/credit-score" element={<CreditScore />} />
        <Route path="/loan-recommendations" element={<LoanRecommendations />} />
        <Route path="/view-offers" element={<LoanOffers />} />
        <Route path="/request-loan" element={<RequestLoan />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>

    // <div>
    //   <div>
    //   {/* <LoanRequestView request={loanRequest} /> */}
    // </div>
    //   {/* <LoanOffers /> */}
    //   {/* <LoanRequests /> */}
    //   {/* <RequestLoan /> */}
    //   {/* <LoanRecommendations /> */}
    //   {/* <CreditScore /> */}
    //   <FarmerLanding />
    //   {/* <LoginPage /> */}
    // </div>
      
  )
}

export default App
