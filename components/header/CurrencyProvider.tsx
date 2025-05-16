'use client';

import { createContext, useContext } from 'react';

const CurrencyContext = createContext({
  currency: 'PKR',
  convertPrice: (price: number) => price, // no conversion
});

export const CurrencyProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <CurrencyContext.Provider value={{ currency: 'PKR', convertPrice: (price) => price }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
