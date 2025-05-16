'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { useCurrency } from '@/components/header/CurrencyProvider';
import { Product } from '@/lib/models/ProductModel';

interface ProductItemProps {
  product: Product;
  className?: string;
}

const ProductItem = ({ product, className = '' }: ProductItemProps) => {
  const [price, setPrice] = useState<number>(0);
  const [originalPrice, setOriginalPrice] = useState<number>(0);
  const { currency, convertPrice } = useCurrency();

  const discountValue = Number(product.discount);

  useEffect(() => {
    setPrice(convertPrice(product.price));
    if (discountValue > 0) {
      const original = product.price / ((100 - discountValue) / 100);
      setOriginalPrice(convertPrice(original));
    } else {
      setOriginalPrice(0);
    }
  }, [product.price, discountValue, convertPrice]);

  const isExternalImage = (imagePath: string) =>
    imagePath.startsWith('http') || imagePath.startsWith('www');

  return (
    <div
      className={`w-full max-w-[280px] bg-white dark:bg-gray-900 flex flex-col transition-transform duration-300 sm:scale-100 scale-[0.96] ${className}`}
      style={{ height: '370px' }}
    >
      <Link href={`/product/${product.slug}`} className="block h-full">
        {/* Image Section */}
        <div className="w-full relative" style={{ height: '270px' }}>
          <Image
            src={
              isExternalImage(product.image)
                ? product.image
                : `/images/banner/pics/${product.image}`
            }
            alt={product.name}
            fill
            className="object-cover w-full h-full"
          />
        </div>

        {/* Details Section */}
        <div className="p-3 rounded-b-md bg-white/80 dark:bg-gray-800/70 backdrop-blur-md shadow-sm space-y-1 h-[100px] flex flex-col justify-between">
          <div className="space-y-0.5">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 leading-snug">
              {product.name}
            </h3>
            {/* Brand name added here */}
            {product.brand && (
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium line-clamp-1">
                {product.brand}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-black dark:text-white">
              {currency} {price.toFixed(2)}
            </span>

            {discountValue > 0 && (
              <>
                <span className="text-xs line-through text-gray-400">
                  {currency} {originalPrice.toFixed(2)}
                </span>
                <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-semibold">
                  -{discountValue}%
                </span>
              </>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
