'use client';

import Image from 'next/image';
import Link from 'next/link';

import {
  Carousel as SCarousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

const salesBanners = [
  {
    src: '/images/banner/banner.jpg',
    alt: 'Mega Sale - Up to 50% Off',
    link: {
      pathname: '/search',
      query: {
        category: 'all',
        q: '',
      },
    },
  },
];

const Carousel3 = () => {
  return (
    <SCarousel opts={{ loop: true }}>
      <CarouselContent>
        {salesBanners.map((banner, index) => (
          <CarouselItem key={index} className="!m-0 !p-0 w-screen max-w-none">
            <Link
              href={banner.link}
              className="relative block h-[300px] sm:h-[304px] md:h-[400px] lg:h-[450px] xl:h-[500px] w-full overflow-hidden m-0 p-0"
            >
              <Image
                src={banner.src}
                alt={banner.alt}
                layout="fill"
                objectFit="cover"
                className="scale-[0.85] sm:scale-[0.88] md:scale-[0.90] lg:scale-[0.93] transition-transform duration-300"
                priority
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </SCarousel>
  );
};

export default Carousel3;
