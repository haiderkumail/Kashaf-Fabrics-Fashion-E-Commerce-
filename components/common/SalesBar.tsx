'use client';

import Link from 'next/link';
import React from 'react';

const SalesBar = () => {
  return (
    <div className="w-full bg-gradient-to-br from-black to-yellow-500 overflow-hidden h-12 relative flex items-center justify-center">
      <Link
        href={{
          pathname: '/search',
          query: {
            category: 'all',
            q: '',
          },
        }}
        className="whitespace-nowrap animate-marquee text-white hover:text-black dark:hover:text-gray-300 transition-all cursor-pointer text-xl font-extrabold tracking-wider"
      >
        {Array(30).fill('50% OFF').join(' — ')}
      </Link>
    </div>
  );
};

export default SalesBar;
