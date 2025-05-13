"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { useCurrency } from '@/components/header/CurrencyProvider';
import { Product } from '@/lib/models/ProductModel';

import { Rating } from './Rating';

interface ProductItemProps {
  product: Product;
  className?: string;
}

const ProductItem = ({ product, className = '' }: ProductItemProps) => {
  const [price, setPrice] = useState<number>(0);
  const { currency, convertPrice } = useCurrency();

  useEffect(() => {
    setPrice(convertPrice(product.price));
  }, [product.price, convertPrice]);

  const isExternalImage = (imagePath: string) =>
    imagePath.startsWith('http') || imagePath.startsWith('www');

  return (
    <div className={`relative group w-full aspect-[2.5/3] overflow-hidden rounded-xl border shadow-sm hover:shadow-xl transition-all ${className}`}>
      <Link href={`/product/${product.slug}`} className="block w-full h-full relative">
        <Image
          src={isExternalImage(product.image) ? product.image : `/images/banner/pics/${product.image}`}
          alt={product.name}
          placeholder="blur"
          blurDataURL={isExternalImage(product.image) ? product.image : `/images/banner/pics/${product.image}`}
          width={500}
          height={500}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
        />

        {/* Price Tag always visible */}
        <div className="absolute top-2 left-2 bg-white text-gray-800 text-sm px-3 py-1 rounded-full font-semibold shadow-md">
          {price > 0 ? `${currency} ${price.toFixed(2)}` : 'Price Unavailable'}
        </div>

        {/* Info Overlay - Always visible on small screens, visible on hover for large screens */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-100 group-hover:opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h3 className="text-white text-sm sm:text-base md:text-lg font-semibold line-clamp-1">{product.name}</h3>
          <p className="text-white text-xs sm:text-sm md:text-base opacity-70 truncate">{product.brand}</p>
          <div className="mt-1">
            <Rating value={product.rating} caption="" isCard />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
