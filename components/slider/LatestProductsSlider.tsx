import ProductItem from '@/components/products/ProductItem';
import CardSlider from '@/components/slider/CardSlider';
import { CarouselItem } from '@/components/ui/carousel';
import productService from '@/lib/services/productService';
import { convertDocToObj } from '@/lib/utils';

const LatestProductsSlider = async () => {
  const latest = await productService.getLatest();

  return (
    <div>
      <h2 className="my-2 text-2xl md:my-4">Latest Products</h2>
      <CardSlider>
        {latest.map((product) => (
          <CarouselItem
            key={product.slug}
            className="basis-1/2 sm:basis-2/2 md:basis-1/3 lg:basis-1/4"
          >
            <ProductItem product={convertDocToObj(product)} />
          </CarouselItem>
        ))}
      </CardSlider>
    </div>
  );
};

export default LatestProductsSlider;
