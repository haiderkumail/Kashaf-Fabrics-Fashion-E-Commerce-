import productService from '@/lib/services/productService';
import { convertDocToObj, delay } from '@/lib/utils';

import ProductItem from './ProductItem';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const ProductItems = async () => {
  await delay(4000);
  const latestProducts = await productService.getLatest();

  return (
    <div className="w-full">
      <h2 className="my-2 text-2xl md:my-4">Latest Products</h2>
      <div className="w-full">
       <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-3 lg:gap-0.5">

          {latestProducts.map((product) => (
            <ProductItem key={product.slug} product={convertDocToObj(product)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductItems;

const ProductItemSkeleton = () => {
  return (
    <div className="w-full bg-white shadow-sm rounded-xl overflow-hidden border hover:shadow-md transition">
      <div className="relative" style={{ aspectRatio: '1' }}>
        <div className="skeleton absolute top-0 left-0 w-full h-full" />
      </div>
      <div className="p-3">
        <div className="skeleton mb-2 h-6 w-3/4"></div>
        <div className="skeleton mb-2 h-4 w-1/2"></div>
        <div className="skeleton mb-2 h-4 w-1/3"></div>
        <div className="mt-2">
          <div className="skeleton h-6 w-20"></div>
        </div>
      </div>
    </div>
  );
};

export const ProductItemsSkeleton = ({ qty, name }: { qty: number; name: string }) => {
  return (
    <div>
      <h2 className="my-2 text-2xl md:my-4">{name}</h2>
      <div className="w-full">
       <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-3 lg:gap-0.5">


          {Array.from({ length: qty }).map((_, i) => {
            return <ProductItemSkeleton key={i} />;
          })}
        </div>
      </div>
    </div>
  );
};
