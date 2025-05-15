import React, { Suspense } from 'react';

import Carousel, { CarouselSkeleton } from '@/components/carousel/carousel';
import Carousel2, { CarouselSkeleton2 } from '@/components/carousel/carousel2';
import Categories from '@/components/categories/Categories';
import SalesBar from '@/components/common/SalesBar';
import CollectionBar from '@/components/header/CollectionBar';
import Icons from '@/components/icons/Icons';
import ProductItems, { ProductItemsSkeleton } from '@/components/products/ProductItems';
import ReadMore from '@/components/readMore/ReadMore';
import Text from '@/components/readMore/Text';
import LatestProductsSlider from '@/components/slider/LatestProductsSlider';
import Slider from '@/components/slider/Slider';

const HomePage = () => {
  return (
    <>
      {/* Move closer to header with minimal spacing */}
      <div className="w-full px-2 sm:px-4 mb-4">
        <CollectionBar />
        <div className="-mx-[calc((100vw-100%)/2)] w-screen relative z-0">
          <Suspense fallback={<CarouselSkeleton />}>
            <SalesBar />
          </Suspense>
        </div>

        <div className="w-screen -mx-[calc((100vw-100%)/2)] relative z-0 -mt-2">
          <Suspense fallback={<CarouselSkeleton />}>
            <Carousel />
          </Suspense>
        </div>
      </div>

      {/* Rest of content */}
      <div className="flex flex-col gap-4 md:gap-16 w-full px-2 sm:px-4">
        {/* Latest Products */}
        <Suspense fallback={<ProductItemsSkeleton qty={8} name="Latest Products" />}>
          <LatestProductsSlider />
        </Suspense>

        {/* Sales Bar */}
        <div className="-mx-[calc((100vw-100%)/2)] w-screen relative z-0">
          <Suspense fallback={<CarouselSkeleton />}>
            <SalesBar />
          </Suspense>
        </div>


        {/* Categories */}
        <div className="w-full">
          <Categories />
        </div>

        {/* Second Carousel */}
        <div className="w-screen -mx-[calc((100vw-100%)/2)] relative z-0 -mt-2">
          <Suspense fallback={<CarouselSkeleton2 />}>
            <Carousel2 />
          </Suspense>
        </div>

        {/* Icons */}
        <div className="w-full">
          <Icons />
        </div>

        {/* Optional: Top Rated Slider and Read More */}
        {/* <Suspense fallback={<ProductItemsSkeleton qty={4} name="Top Rated" />}>
          <Slider />
        </Suspense>

        <div className="w-full">
          <ReadMore>
            <Text />
          </ReadMore>
        </div> */}
      </div>
    </>
  );
};

export default HomePage;
