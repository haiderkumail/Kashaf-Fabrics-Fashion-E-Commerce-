import Link from 'next/link';
import React, { Suspense } from 'react';

import { Carousel as SCarousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import productService from '@/lib/services/productService';
import { delay } from '@/lib/utils';

const Carousel2 = async () => {
    await delay(3000);
    const featuredProducts = await productService.getFeatured(); // Fetch the featured products for the second carousel

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
                                        <source src="/images/banner/video2.mp4" type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </Link>

                                {/* Overlay text */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/30 px-4">
                                    <h2 className="text-2xl md:text-5xl font-bold mb-2">
                                        &quot;Elegance is the only beauty that never fades.&quot;
                                    </h2>
                                    <p className="text-base md:text-xl mb-4">
                                        Discover the finest craftsmanship with Kashaf Fabrics
                                    </p>
                                    <p className="text-lg md:text-2xl font-semibold animate-fade-urdu">
                                        کشف فیبرکس — روایتی لباس، جدید انداز
                                    </p>
                                    <Link
                                        href={{
                                            pathname: '/search',
                                            query: {
                                                category: 'all',
                                                q: '', // Keep this empty or you can set a default value like 'all'
                                            },
                                        }}
                                        className="mt-6 bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-neutral-200 transition-all duration-300"
                                    >
                                        Explore Now
                                    </Link>
                                </div>
                            </div>
                        </CarouselItem>
                    ))
                ) : (
                    <CarouselItem>
                        <div className="relative h-[304px] lg:h-[536px] w-screen left-1/2 right-1/2 -translate-x-1/2 overflow-hidden">
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
                                <source src="/images/banner/pic.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>

                            {/* Overlay text */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/30 px-4">
                                <h2 className="text-2xl md:text-5xl font-bold mb-2">
                                    &quot;Simplicity is the only beauty that never fades.&quot;
                                </h2>
                                <p className="text-base md:text-xl mb-4">
                                    Discover the finest craftsmanship with Kashaf Fabrics
                                </p>
                                <p className="text-lg md:text-2xl font-semibold animate-fade-urdu">
                                    Kashaf Fabrics — Timeless Tradition, Modern Grace
                                </p>

                                <Link
                                    href={{
                                        pathname: '/search',
                                        query: {
                                            category: 'all',
                                            q: '', // Keep this empty or you can set a default value like 'all'
                                        },
                                    }}
                                    className="mt-6 bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-neutral-200 transition-all duration-300"
                                >
                                    Explore Now
                                </Link>
                            </div>
                        </div>
                    </CarouselItem>
                )}
            </CarouselContent>
        </SCarousel>
    );
};

export default Carousel2;

export const CarouselSkeleton2 = () => {
    return <div className="skeleton h-[304px] w-full rounded-lg lg:h-[536px]" />;
};
