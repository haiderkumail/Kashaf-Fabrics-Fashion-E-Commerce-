import ProductItem from '@/components/products/ProductItem';
import CardSlider from '@/components/slider/CardSlider';
import { CarouselItem } from '@/components/ui/carousel';

type SliderProps = {
  products: any[];
};

const Slider = ({ products }: SliderProps) => {
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-6">
  Related Products
</h2>

      <CardSlider>
        {products.map((product) => (
          <CarouselItem
            key={product.slug}
            className="basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
          >
            <ProductItem product={product} />
          </CarouselItem>
        ))}
      </CardSlider>
    </div>
  );
};

export default Slider;
