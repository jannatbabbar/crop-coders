import { useState } from 'react'
import './App.css'
import FarmerLanding from './Farmer/FarmerLanding'
import CreditScore from './Farmer/CreditScore'
import LoanRecommendations from './Farmer/LoanRecommendations'
import RequestLoan from './Farmer/RequestLoan'
import LoanRequests from './Lender/LoanRequests'
import LoanOffers from './Farmer/LoanOffers'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage'
import LoginPageFarmer from './Farmer/LoginPageFarmer'
import LoginPageLender from './Lender/LoginPageLender'
import { FarmerProvider } from './context/FarmerContext'
import { LenderProvider } from './context/LenderContext'

function App() {
  const loanRequest = {
    name: 'Ravi Kumar',
    location: 'Maharashtra, India',
    amount: '100000',
    interestRange: '5% - 8%',
    duration: '24 months',
  };
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Wrap only Farmer-specific routes with the FarmerProvider */}
          <Route
            path="/farmer/*"
            element={
              <FarmerProvider>
                <Routes>
                  <Route path="login" element={<LoginPageFarmer />} />
                  <Route path="dashboard" element={<FarmerLanding />} />
                  <Route path="credit-score" element={<CreditScore />} />
                  <Route path="loan-recommendations" element={<LoanRecommendations />} />
                  <Route path="view-offers" element={<LoanOffers />} />
                  <Route path="request-loan" element={<RequestLoan />} />
                </Routes>
              </FarmerProvider>
            }
          />
          <Route
            path="/lender/*"
            element={
              <LenderProvider>
                <Routes>
                  <Route path="login" element={<LoginPageLender />} />
                  <Route path="loan-requests" element={<LoanRequests />} />
                </Routes>
              </LenderProvider>
            }
          />
        </Routes>
      </Router>

     
    </div>
  )
}

export default App
