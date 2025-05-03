import React, { createContext, useContext, useState } from 'react';

const FarmerContext = createContext();
export const useFarmer = () => useContext(FarmerContext);

export const FarmerProvider = ({ children }) => {
  const [farmerId, setFarmerId] = useState(null);
  return (
    <FarmerContext.Provider value={{ farmerId, setFarmerId }}>
      {children}
    </FarmerContext.Provider>
  );
};
