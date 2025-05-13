import React, { Suspense } from 'react';

import Carousel, { CarouselSkeleton } from '@/components/carousel/carousel';
import Carousel2, { CarouselSkeleton2 } from '@/components/carousel/carousel2';
import Categories from '@/components/categories/Categories';
import Icons from '@/components/icons/Icons';
import ProductItems, { ProductItemsSkeleton } from '@/components/products/ProductItems';
import ReadMore from '@/components/readMore/ReadMore';
import Text from '@/components/readMore/Text';
import LatestProductsSlider from '@/components/slider/LatestProductsSlider';
import Slider from '@/components/slider/Slider';

const HomePage = () => {
  return (
    <div className='my-8 flex flex-col gap-4 md:gap-16'>
      <div className="w-full mx-0">
        <Suspense fallback={<CarouselSkeleton />}>
          <Carousel />
        </Suspense>
      </div>

      <Suspense fallback={<ProductItemsSkeleton qty={8} name="Latest Products" />}>
        <LatestProductsSlider />
      </Suspense>

      <div className='flex flex-col gap-8 md:flex-row px-4 md:px-0'>
        <div className='flex-1'>
          <p className='text-4xl font-semibold md:text-6xl leading-tight'>
            Simply Unique/ <br /> Simply Better.
          </p>
        </div>
        <div className='flex flex-1 items-center'>
          <div>
            <span className='font-bold'>Kashaf Fabrics</span> is a premium clothing brand based in Lahore, <br className='hidden sm:inline' />
            Pakistan. Est since 2019.
          </div>
        </div>
      </div>

      <div className="mx-4 md:mx-0">
        <Categories />
      </div>

      <div className="mx-4 md:mx-0">
        <Icons />
      </div>

      {/* Second Carousel (Carousel2) */}
      <div className="w-full mx-0">
        <Suspense fallback={<CarouselSkeleton2 />}>
          <Carousel2 />
        </Suspense>
      </div>

      <Suspense fallback={<ProductItemsSkeleton qty={4} name='Top Rated' />}>
        <Slider />
      </Suspense>

      <div className="mx-4 md:mx-0">
        <ReadMore>
          <Text />
        </ReadMore>
      </div>
    </div>
  );
};

export default HomePage;
