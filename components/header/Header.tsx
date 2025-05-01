'use client';

import { AlignJustify } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { useCurrency } from '@/components/header/CurrencyProvider'; // Import useCurrency hook

import Menu from './Menu';
import { SearchBox } from './SearchBox';


// Define the Currency type locally
type Currency = 'USD' | 'PKR' | 'GBP';

const Header = () => {
  const { setCurrency } = useCurrency(); // Get the setter function for currency

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(event.target.value as Currency);
  };

  return (
    <header>
      <nav>
        <div className='navbar justify-between bg-base-300'>
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
              />
              <span className='text-base font-semibold'>Kashaf Fabrics</span>
            </Link>
          </div>

          <div>
            {/* Currency Dropdown */}
            <select
              onChange={handleCurrencyChange}
              defaultValue='USD'
              className='select select-bordered'
            >
              <option value='USD'>USD</option>
              <option value='PKR'>PKR</option>
              <option value='GBP'>GBP</option>
            </select>
          </div>

          <Menu />
        </div>
        <div className='block bg-base-300 pb-3 text-center md:hidden'>
          <SearchBox />
        </div>
      </nav>
    </header>
  );
};

export default Header;
