'use client';

import { useCurrency } from '@/components/header/CurrencyProvider';

const ProductPrice = ({ price }: { price: number }) => {
  const { currency, convertPrice } = useCurrency();
  return (
    <div>
      {currency} {convertPrice(price).toFixed(2)}
    </div>
  );
};

export default ProductPrice;
