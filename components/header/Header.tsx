'use client';

import {
  AlignJustify,
  Search,
  ShoppingCart,
  MoreVertical,
  Sun,
  Moon
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
  const { currency } = useCurrency();

  const { items } = useCartService();
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
  className='ml-2 flex items-center gap-4 sm:ml-6 sm:text-2xl'
>
  <Image
    src='/images/banner/logo.png'
    alt='Logo'
    width={160}
    height={160}
    className='w-24 h-24 object-contain sm:w-[160px] sm:h-[160px]'
  />
  <span className='text-xl sm:text-3xl font-extrabold tracking-wide'>
    Kashaf Fabrics
  </span>
</Link>


          </div>

          {/* Currency selector removed */}
          {/* <div className='flex items-center'>
            <select
              onChange={handleCurrencyChange}
              defaultValue='USD'
              className='select select-bordered text-sm sm:text-base'
            >
              <option value='USD'>USD</option>
              <option value='PKR'>PKR</option>
              <option value='GBP'>GBP</option>
            </select>
          </div> */}

          <Menu />
        </div>

        {/* MOBILE HEADER */}
        <div className='md:hidden bg-base-300 px-4 py-2 shadow-sm'>
          <div className='flex items-center justify-between'>
            {/* Hamburger menu */}
            <label htmlFor='my-drawer' className='btn btn-square btn-ghost p-1'>
              <AlignJustify className='w-5 h-5' />
            </label>

            {/* Logo */}
            <Link href='/' className='flex items-center gap-2'>
              <Image
                src='/images/banner/logo.png'
                alt='Logo'
                width={150}
                height={60}
                className='w-25 h-17 object-contain'
              />
            </Link>

            {/* Right side: Cart + Theme toggle + dropdown */}
            <div className='flex items-center gap-2'>

              {/* Cart icon */}
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

              {/* Theme toggler
              <label className='swap swap-rotate'>
                <input
                  type='checkbox'
                  checked={!isDark} // Use !isDark to reflect the light theme
                  onChange={toggleTheme}
                />
                <Sun className='swap-on w-5 h-5' />
                <Moon className='swap-off w-5 h-5' />
              </label> */}

              {/* Dropdown menu */}
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

                  {/* Menu component here keeps Sign In / Profile / Sign Out etc inside dropdown */}
                  <li><Menu /></li>
                </ul>
              </div>
            </div>

          </div>

          {/* Search box */}
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
