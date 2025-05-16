import ProductItem from '@/components/products/ProductItem';
import CardSlider from '@/components/slider/CardSlider';
import { CarouselItem } from '@/components/ui/carousel';
import productService from '@/lib/services/productService';
import { convertDocToObj } from '@/lib/utils';

const LatestProductsSlider = async () => {
  const latest = await productService.getLatest();

  return (
    <div className="w-full px-0 my-2 sm:my-4">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-6">
        New Arrivals
      </h2>
      <CardSlider>
        {latest.map((product) => (
          <CarouselItem
            key={product.slug}
            className="basis-1/2 sm:basis-1/3 md:basis-1/4 px-1 sm:px-2"
          >
            <ProductItem product={convertDocToObj(product)} />
          </CarouselItem>
        ))}
      </CardSlider>
    </div>
  );
};

export default LatestProductsSlider;
