import Link from 'next/link';

import {
  Carousel as SCarousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import productService from '@/lib/services/productService';
import { delay } from '@/lib/utils';

const Carousel = async () => {
  await delay(3000);
  const featuredProducts = await productService.getFeatured();

  return (
    <SCarousel opts={{ loop: true }}>
      <CarouselContent>
        {featuredProducts.length > 0 ? (
          featuredProducts.map((product) => (
            <CarouselItem key={product._id}>
              <div className="relative h-[304px] lg:h-[536px] overflow-hidden rounded-lg">
                <Link href={`/product/${product.slug}`}>
                  <video
                    className="h-full w-full object-cover"
                    width={1500}
                    height={300}
                    playsInline
                    autoPlay
                    muted
                    loop
                    preload="auto"
                  >
                    <source src="/images/banner/video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </Link>
              </div>
            </CarouselItem>
          ))
        ) : (
          <CarouselItem>
            <div className="relative h-[304px] lg:h-[536px] overflow-hidden rounded-lg">
              <video
                className="h-full w-full object-cover"
                width={1500}
                height={300}
                playsInline
                autoPlay
                muted
                loop
                preload="auto"
              >
                <source src="/images/banner/video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Overlay text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/30 px-4">
                <h2 className="text-2xl md:text-5xl font-bold mb-2">
                  Elegance in Motion
                </h2>
                <p className="text-base md:text-xl mb-4">
                  Step into our world of modern Pakistani fashion
                </p>
                <p className="text-lg md:text-2xl font-semibold animate-fade-urdu">
                  کشف فیبرکس — روایتی لباس، جدید انداز
                </p>
                <Link
                  href={{
                    pathname: '/search',
                    query: {
                      category: 'all',
                      q: '',  // Keep this empty or you can set a default value like 'all'
                    },
                  }}
                  className="mt-6 bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-neutral-200 transition-all duration-300"
                >
                  Shop Now
                </Link>



              </div>
            </div>
          </CarouselItem>
        )}
      </CarouselContent>
      {/* <CarouselPrevious className='absolute left-4 top-1/2' />
      <CarouselNext className='absolute right-4 top-1/2' /> */}
    </SCarousel>
  );
};

export default Carousel;

export const CarouselSkeleton = () => {
  return <div className='skeleton h-[304px] w-full rounded-lg lg:h-[536px]' />;
};
