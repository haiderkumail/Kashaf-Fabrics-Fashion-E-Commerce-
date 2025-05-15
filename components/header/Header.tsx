'use client';

import {
  AlignJustify,
  Search,
  ShoppingCart,
  MoreVertical
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import { useCurrency } from '@/components/header/CurrencyProvider';
import useCartService from '@/lib/hooks/useCartStore';

import Menu from './Menu';
import { SearchBox } from './SearchBox';

type Currency = 'USD' | 'PKR' | 'GBP';

const Header = () => {
  const { setCurrency } = useCurrency();
  const { items } = useCartService(); // ✅ Cart items
  const [isDark, setIsDark] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    setIsDark(currentTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    setIsDark(!isDark);
  };

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(event.target.value as Currency);
  };

  const toggleSearchBox = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <header>
      <nav>
        {/* --- LAPTOP HEADER --- */}
        <div className='hidden md:flex navbar flex-wrap items-center justify-between bg-base-300 px-4 py-2 gap-2 sm:gap-0'>
          <div className='flex items-center'>
            <label htmlFor='my-drawer' className='btn btn-square btn-ghost'>
              <AlignJustify />
            </label>
            <Link
              href='/'
              className='ml-2 flex items-center gap-2 sm:ml-4 sm:text-lg'
            >
              <Image
                src='/images/banner/logo.png'
                alt='Logo'
                width={90}
                height={90}
                className='w-16 h-16 object-contain sm:w-[90px] sm:h-[90px]'
              />
              <span className='text-base font-semibold'>Kashaf Fabrics</span>
            </Link>
          </div>

          <div className='flex items-center'>
            <select
              onChange={handleCurrencyChange}
              defaultValue='USD'
              className='select select-bordered text-sm sm:text-base'
            >
              <option value='USD'>USD</option>
              <option value='PKR'>PKR</option>
              <option value='GBP'>GBP</option>
            </select>
          </div>

          <Menu />
        </div>

        {/* --- MOBILE HEADER --- */}
        <div className='md:hidden bg-base-300 px-4 py-2 shadow-sm'>
          <div className='flex items-center justify-between'>
            {/* Left: Drawer Icon */}
            <label htmlFor='my-drawer' className='btn btn-square btn-ghost p-1'>
              <AlignJustify className='w-5 h-5' />
            </label>

            {/* Center: Logo */}
            <Link href='/' className='flex items-center gap-2'>
              <Image
                src='/images/banner/logo.png'
                alt='Logo'
                width={150}
                height={60}
                className='w-25 h-17 object-contain'
              />
              {/* <span className='text-base font-semibold'>Kashaf Fabrics</span> */}
            </Link>

            {/* Right: Cart and Dropdown */}
            <div className='flex items-center gap-2'>
              {/* Cart Icon */}
              <Link href='/cart' className='relative' aria-label='Shopping Cart'>
                <ShoppingCart className='w-5 h-5' />
                {items.length !== 0 && (
                  <span className='absolute -right-2 -top-2'>
                    <div className='badge badge-primary px-1.5 text-xs'>
                      {items.reduce((a, c) => a + c.qty, 0)}
                    </div>
                  </span>
                )}
              </Link>

              {/* Dropdown Menu */}
              <div className='dropdown dropdown-end'>
                <div tabIndex={0} role='button' className='btn btn-ghost btn-square p-1'>
                  <MoreVertical className='w-5 h-5' />
                </div>
                <ul
                  tabIndex={0}
                  className='dropdown-content mt-2 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-2'
                >
                  <li>
                    <button onClick={toggleSearchBox} className='btn btn-sm w-full justify-start'>
                      <Search className='w-4 h-4 mr-2' /> Search
                    </button>
                  </li>
                  <li>
                    <select
                      onChange={handleCurrencyChange}
                      defaultValue='USD'
                      className='select select-bordered select-sm w-full'
                    >
                      <option value='USD'>USD</option>
                      <option value='PKR'>PKR</option>
                      <option value='GBP'>GBP</option>
                    </select>
                  </li>
                  <li><Menu /></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Search Box Below Dropdown */}
          {searchVisible && (
            <div className='mt-2 px-1'>
              <SearchBox />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
