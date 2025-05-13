'use client';

import { useState, useEffect, useRef } from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';

interface IProducts {
  children: React.ReactNode;
}

const CardSlider = ({ children }: IProducts) => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    const interval = setInterval(() => {
      if (!isPaused && api) {
        api.scrollNext();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [api, isPaused]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);
  const handleFocus = () => setIsPaused(true);
  const handleBlur = () => setIsPaused(false);

  const goToNext = () => {
    if (api) {
      api.scrollNext();
    }
  };

  const goToPrevious = () => {
    if (api) {
      api.scrollPrev();
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={0}
    >
      <Carousel setApi={setApi} opts={{ loop: true }}>
        {/* Updated to make sure the layout is responsive */}
        <CarouselContent className="[&>*]:w-1/2 sm:[&>*]:w-1/3 md:[&>*]:w-1/4 lg:[&>*]:w-1/5 xl:[&>*]:w-1/6">
          {children}
        </CarouselContent>
        <CarouselPrevious
          className="absolute left-4 top-1/2 transform -translate-y-1/2"
          onClick={goToPrevious}
        />
        <CarouselNext
          className="absolute right-4 top-1/2 transform -translate-y-1/2"
          onClick={goToNext}
        />
      </Carousel>
    </div>
  );
};

export default CardSlider;
