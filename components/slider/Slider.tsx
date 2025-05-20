import ProductItem from '@/components/products/ProductItem';
import CardSlider from '@/components/slider/CardSlider';
import { CarouselItem } from '@/components/ui/carousel';

type SliderProps = {
  products: any[];
};

const Slider = ({ products }: SliderProps) => {
  return (
    <div>
      <h2
        className="text-2xl sm:text-3xl font-normal text-center mb-6 uppercase"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        Related Products
      </h2>

      <CardSlider>
        {products.map((product) => (
          <CarouselItem
            key={product.slug}
            className="basis-1/2 sm:basis-1/3 md:basis-[20%] px-1 sm:px-2"
          >
            <ProductItem product={product} />
          </CarouselItem>
        ))}
      </CardSlider>
    </div>
  );
};

export default Slider;
