"use client"; // Mark this file as a client component

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { useCurrency } from '@/components/header/CurrencyProvider';
import { Product } from '@/lib/models/ProductModel';

import { Rating } from './Rating';

const ProductItem = ({ product }: { product: Product }) => {
  const [price, setPrice] = useState<number>(0);
  const { currency, convertPrice } = useCurrency();

  useEffect(() => {
    // Convert price based on selected currency
    const convertedPrice = convertPrice(product.price);
    setPrice(convertedPrice);
  }, [product.price, convertPrice]);

  const isExternalImage = (imagePath: string) => {
    return imagePath.startsWith('http') || imagePath.startsWith('www');
  };

  return (
    <div className="card mb-4 bg-base-300">
      <figure>
        <Link href={`/product/${product.slug}`} className="relative aspect-square h-full w-full">
          <Image
            src={isExternalImage(product.image) ? product.image : `/images/banner/pics/${product.image}`}
            alt={product.name}
            placeholder="blur"
            blurDataURL={isExternalImage(product.image) ? product.image : `/images/banner/pics/${product.image}`}
            width={350}
            height={350}
            className="h-full w-full object-cover"
          />
        </Link>
      </figure>
      <div className="card-body">
        <Link href={`/product/${product.slug}`}>
          <h3 className="card-title line-clamp-1 font-normal">{product.name}</h3>
        </Link>
        <Rating value={product.rating} caption={`(${product.name})`} isCard />
        <p className="line-clamp-1">{product.brand}</p>
        <div className="card-actions flex items-center justify-between">
          <span className="text-2xl">
            {price > 0 ? `${currency} ${price.toFixed(2)}` : 'Price Unavailable'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
