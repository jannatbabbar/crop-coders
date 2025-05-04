import React, { createContext, useContext, useState } from 'react';

const FarmerContext = createContext();
export const useFarmer = () => useContext(FarmerContext);

export const FarmerProvider = ({ children }) => {
  const [farmerId, setFarmerId] = useState(null);
  const [farmerName, setFarmerName] = useState(null);
  const [farmerState, setFarmerState] = useState('');
  const [farmerDistrict, setFarmerDistrict] = useState('');
  return (
    <FarmerContext.Provider value={{ 
      farmerId, setFarmerId,
      farmerName, setFarmerName,
      farmerState, setFarmerState,
      farmerDistrict, setFarmerDistrict
      }}>
      {children}
    </FarmerContext.Provider>
  );
};
