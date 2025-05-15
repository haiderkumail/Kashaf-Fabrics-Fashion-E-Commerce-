'use client';

import Link from 'next/link';
import { useState } from 'react';

const collections = [
  {
    name: 'Summer Collection',
    slug: 'summer',
    categories: [
      { name: 'Wash and Wear', href: '/search?category=Wash and Wear' },
      { name: 'Cotton Suits', href: '/search?category=Cotton' },
      { name: 'Ladies Lawn Suits', href: '/search?category=Ladies Lawn Suits' },
    ],
  },
  {
    name: 'Winter Collection',
    slug: 'winter',
    categories: [
      { name: 'Sweaters', href: '/search?category=Sweaters' },
      { name: 'Jackets', href: '/search?category=Jackets' },
      { name: 'Wool Dresses', href: '/search?category=Wool Dresses' },
    ],
  },
  {
    name: 'Ready to Wear',
    slug: 'ready-to-wear',
    categories: [
      { name: 'Kurta', href: '/search?category=Ready to Wear' },
      { name: '2 Piece', href: '/search?category=2 Piece' },
      { name: '3 Piece', href: '/search?category=3 Piece' },
    ],
  },
  {
    name: 'Fragrances',
    slug: 'fragrances',
    categories: [
      { name: 'Perfumes', href: '/search?category=Fragrance' },
      { name: 'Body Mists', href: '/search?category=Body Mists' },
    ],
  },
];

const CollectionBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCollection, setActiveCollection] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const handleCollectionClick = (slug: string) => {
    setActiveCollection(slug);
  };

  const handleBackClick = () => {
    setActiveCollection(null);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      {/* Desktop Menu */}
      <nav className="bg-transparent border-b-0 shadow-sm z-[60] relative w-full">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="hidden sm:flex space-x-4 sm:space-x-6 py-3 text-sm font-medium items-center justify-center w-full">
            {collections.map((collection) => (
              <li
                key={collection.slug}
                onMouseEnter={() => setHovered(collection.slug)}
                onMouseLeave={() => setHovered(null)}
                className="relative group"
              >
                <span className="text-base-content dark:text-white hover:text-black dark:hover:text-gray-300 transition-all cursor-pointer">
                  {collection.name}
                </span>

                <div
                  className={`absolute left-0 mt-2 w-48 sm:w-56 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 z-50 transition-opacity duration-200 ${hovered === collection.slug ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                >
                  {collection.categories.map((cat) => (
                    <Link
                      key={cat.name}
                      href={cat.href}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 ${isMenuOpen ? 'block' : 'hidden'}`}
        onClick={handleMenuToggle}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-800 shadow-lg p-4 sm:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
      >
        <div className="w-11/12 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
          {activeCollection && (
            <button onClick={handleBackClick} className="text-gray-700 dark:text-white mb-2 text-sm">
              Back to Collections
            </button>
          )}
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-4 text-center">
            {activeCollection
              ? collections.find((col) => col.slug === activeCollection)?.name
              : 'Collections'}
          </h3>

          {!activeCollection && (
            <div className="mb-4">
              <button
                onClick={() => {
                  window.location.href = '/';
                }}
                className="text-gray-700 dark:text-white text-sm underline hover:text-black dark:hover:text-gray-300"
              >
                ← Back to Home
              </button>
            </div>
          )}

          <ul>
            {!activeCollection ? (
              collections.map((collection) => (
                <li key={collection.slug}>
                  <button
                    onClick={() => handleCollectionClick(collection.slug)}
                    className="text-black dark:text-white text-sm w-full py-2 flex justify-between items-center"
                  >
                    {collection.name}
                    <span>{'>'}</span>
                  </button>
                </li>
              ))
            ) : (
              collections
                .find((col) => col.slug === activeCollection)
                ?.categories.map((cat) => (
                  <li key={cat.name}>
                    <Link
                      href={cat.href}
                      className="text-black dark:text-white text-sm w-full py-2 block"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))
            )}
          </ul>
        </div>
      </div>

      {/* Mobile Toggle Button */}
<div className={`fixed bottom-0 left-0 right-0 z-50 p-4 sm:hidden ${!isMenuOpen ? 'block' : 'hidden'}`}>
  <button
    onClick={handleMenuToggle}
    className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold text-sm w-[200px] mx-auto py-2 rounded-xl shadow-md hover:opacity-90 transition-all duration-200 block"
  >
    Collections
  </button>
</div>



    </>
  );
};

export default CollectionBar;
