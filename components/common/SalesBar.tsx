'use client';

import React from 'react';

const SalesBar = () => {
  return (
    <div className="w-full bg-transparent overflow-hidden h-8 relative">
      <div className="absolute whitespace-nowrap animate-marquee text-base-content dark:text-white hover:text-black dark:hover:text-gray-300 transition-all cursor-pointer text-sm font-semibold">
        {Array(20).fill('40% OFF').join(' — ')}
      </div>
    </div>
  );
};

export default SalesBar;
