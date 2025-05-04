import React, { createContext, useContext, useState } from 'react';

const LenderContext = createContext();
export const useLender = () => useContext(LenderContext);

export const LenderProvider = ({ children }) => {
  const [lenderId, setLenderId] = useState(null);
  const [lenderState, setLenderState] = useState(null);
  return (
    <LenderContext.Provider value={{ lenderId, setLenderId, lenderState, setLenderState }}>
      {children}
    </LenderContext.Provider>
  );
};
