'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

// Define available currencies
type Currency = 'USD' | 'PKR' | 'GBP';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  convertPrice: (price: number) => number;
}

// Create the context
const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Conversion rates (example rates, you can make dynamic later)
const conversionRates: Record<Currency, number> = {
  USD: 1,
  PKR: 280,
  GBP: 0.75,
};

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<Currency>('USD');

  const convertPrice = (price: number) => {
    return price * conversionRates[currency];
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

// Hook to use context
export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error('useCurrency must be used within a CurrencyProvider');
  return context;
};
