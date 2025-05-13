'use client';

import { ChevronDown, Moon, ShoppingCart, Sun } from 'lucide-react';
import Link from 'next/link';
import { signOut, signIn, useSession } from 'next-auth/react';

import useCartService from '@/lib/hooks/useCartStore';
import useLayoutService from '@/lib/hooks/useLayout';

import { SearchBox } from './SearchBox';


const Menu = () => {
  const { items, init } = useCartService();
  const { data: session } = useSession();
  const { theme, toggleTheme } = useLayoutService();

  const signOutHandler = () => {
    signOut({ callbackUrl: '/signin' });
    init();
  };

  const handleClick = () => {
    (document.activeElement as HTMLElement).blur();
  };

  return (
    <>
      {/* Desktop Search Box */}
      <div className='hidden md:block w-full max-w-sm'>
        <SearchBox />
      </div>

      {/* --- DESKTOP MENU --- */}
      <ul className='hidden md:flex flex-wrap items-center justify-end gap-2 sm:gap-3'>
        {/* Theme Toggle & Cart */}
        <li className='flex items-center gap-2 sm:gap-3'>
          <label className='swap swap-rotate'>
            <input
              type='checkbox'
              checked={theme === 'light'}
              onChange={toggleTheme}
            />
            <Sun className='swap-on w-5 h-5 sm:w-6 sm:h-6' />
            <Moon className='swap-off w-5 h-5 sm:w-6 sm:h-6' />
          </label>
          <Link
            href='/cart'
            className='relative'
            aria-label='Shopping Cart'
          >
            <ShoppingCart className='w-5 h-5 sm:w-6 sm:h-6' />
            {items.length !== 0 && (
              <span className='absolute -right-3 -top-3'>
                <div className='badge badge-primary px-1.5 text-xs'>
                  {items.reduce((a, c) => a + c.qty, 0)}
                </div>
              </span>
            )}
          </Link>
        </li>

        {/* Auth Section */}
        {session && session.user ? (
          <li>
            <div className='dropdown dropdown-end dropdown-bottom'>
              <label tabIndex={0} className='btn btn-ghost rounded-btn px-2 sm:px-3 text-sm sm:text-base'>
                {session.user.name}
                <ChevronDown className='w-4 h-4 sm:w-5 sm:h-5' />
              </label>
              <ul
                tabIndex={0}
                className='menu dropdown-content z-[1] w-44 sm:w-52 rounded-box bg-base-300 p-2 shadow'
              >
                {session.user.isAdmin && (
                  <li onClick={handleClick}>
                    <Link href='/admin/dashboard'>Admin Dashboard</Link>
                  </li>
                )}
                <li onClick={handleClick}>
                  <Link href='/order-history'>Order History</Link>
                </li>
                <li onClick={handleClick}>
                  <Link href='/profile'>Profile</Link>
                </li>
                <li onClick={handleClick}>
                  <button type='button' onClick={signOutHandler}>
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          </li>
        ) : (
          <li>
            <button
              className='btn btn-ghost rounded-btn text-sm sm:text-base'
              type='button'
              onClick={() => signIn()}
            >
              Sign In
            </button>
          </li>
        )}
      </ul>

      {/* --- MOBILE MENU SECTION --- */}
      <div className='md:hidden space-y-2'>
        {/* Theme Toggle */}
        <div className='flex items-center gap-3'>
          <label className='swap swap-rotate'>
            <input
              type='checkbox'
              checked={theme === 'light'}
              onChange={toggleTheme}
            />
            <Sun className='swap-on w-5 h-5' />
            <Moon className='swap-off w-5 h-5' />
          </label>
        </div>

        {/* Auth Section */}
        <div className='space-y-1'>
          {session && session.user ? (
            <div className='space-y-1'>
              {session.user.isAdmin && (
                <Link
                  href='/admin/dashboard'
                  onClick={handleClick}
                  className='block w-full text-left btn btn-sm btn-ghost'
                >
                  Admin Dashboard
                </Link>
              )}
              <Link
                href='/order-history'
                onClick={handleClick}
                className='block w-full text-left btn btn-sm btn-ghost'
              >
                Order History
              </Link>
              <Link
                href='/profile'
                onClick={handleClick}
                className='block w-full text-left btn btn-sm btn-ghost'
              >
                Profile
              </Link>
              <button
                onClick={signOutHandler}
                className='block w-full text-left btn btn-sm btn-ghost'
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              className='block w-full text-left btn btn-sm btn-ghost'
              onClick={() => signIn()}
            >
              Sign In
            </button>
          )}
        </div>
      </div>

    </>
  );
};

export default Menu;
