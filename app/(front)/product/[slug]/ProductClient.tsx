'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import AddToCart from '@/components/products/AddToCart';
import ProductPrice from '@/components/products/ProductPrice';
import { Rating } from '@/components/products/Rating';
import Slider from '@/components/slider/Slider';

type ProductClientProps = {
  product: any;
  base64: string;
  topRated: any[]; // 👈 Add this to accept top rated products
};

export default function ProductClient({ product, base64, topRated }: ProductClientProps) {
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  const hasColors = product.colors && product.colors.length > 0;
  const hasSizes = product.sizes && product.sizes.length > 0;

  const isReadyToAdd =
    product.countInStock > 0 &&
    (!hasColors || selectedColor) &&
    (!hasSizes || selectedSize);

  const getProductImage = () => {
    if (selectedColor && product.colors) {
      const color = product.colors.find((c: any) => c.name === selectedColor);
      return color?.imageUrl || product.image;
    }
    return product.image;
  };

  return (
    <div className="my-2">
      <div className="my-4">
        <Link href="/" className="btn">{`<- Back to Products`}</Link>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {/* Product Image */}
        <div className="relative aspect-square md:col-span-2">
          <Image
            src={getProductImage()}
            alt={product.name}
            placeholder="blur"
            blurDataURL={base64}
            width={640}
            height={640}
            sizes="100vw"
            className="h-full w-full object-contain"
          />
        </div>

        {/* Product Info */}
        <div>
          <ul className="space-y-4">
            <li><h1 className="text-xl">{product.name}</h1></li>
            {/* <li><Rating value={product.rating} caption={`${product.numReviews} ratings`} /></li> */}
            <li>{product.brand}</li>
            <li><div className="divider"></div></li>
            <li><p>Description: {product.description}</p></li>

            {/* Colors */}
            {hasColors && (
              <li>
                <div className="mt-2">
                  <label className="font-semibold">Color:</label>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {product.colors.map((color: any, index: number) => (
                      <button
                        key={color.name || index}
                        className={`flex flex-col items-center justify-center rounded border p-1 transition duration-150 ${
                          selectedColor === color.name ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => setSelectedColor(color.name)}
                        type="button"
                      >
                        <div className="h-12 w-12 overflow-hidden rounded">
                          <Image
                            src={color.imageUrl || '/placeholder.jpg'}
                            alt={color.name}
                            width={48}
                            height={48}
                            className="object-cover h-full w-full"
                          />
                        </div>
                        <div className="text-sm mt-2">{color.name}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </li>
            )}

            {/* Sizes */}
            {hasSizes && (
              <li>
                <div className="mt-2">
                  <label className="font-semibold">Size:</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {product.sizes.map((size: string, index: number) => (
                      <button
                        key={size || index}
                        className={`px-3 py-1 rounded border ${
                          selectedSize === size ? 'bg-primary text-white' : 'bg-base-200'
                        }`}
                        onClick={() => setSelectedSize(size)}
                        type="button"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </li>
            )}
          </ul>
        </div>

        {/* Add to Cart */}
        <div>
          <div className="card mt-3 bg-base-300 shadow-xl md:mt-0">
            <div className="card-body">
              <div className="flex justify-between">
                <div>Price</div>
                <ProductPrice price={product.price} />
              </div>
              <div className="mb-2 flex justify-between">
                <div>Status</div>
                <div>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</div>
              </div>

              {product.countInStock !== 0 && (
                <div className="card-actions justify-center">
                  <AddToCart
                    item={{
                      ...product,
                      qty: 0,
                      color: selectedColor,
                      size: selectedSize,
                      image: getProductImage(),
                    }}
                    disabled={!isReadyToAdd}
                  />
                </div>
              )}

              {!isReadyToAdd && (
                <p className="text-sm text-error text-center mt-2">
                  Please select {hasColors && 'color'} {hasColors && hasSizes && 'and'} {hasSizes && 'size'} to add to cart.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 🔥 Top Rated Slider */}
      <div className="mt-10">
        {/* <h2 className="text-2xl font-bold mb-4 text-center">Top Rated Products</h2> */}
        <Slider products={topRated} />
      </div>
    </div>
  );
}
