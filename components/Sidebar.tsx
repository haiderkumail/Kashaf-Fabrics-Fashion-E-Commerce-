'use client';

import Link from 'next/link';
import useSWR from 'swr';

import useLayoutService from '@/lib/hooks/useLayout';

const Sidebar = () => {
  const { toggleDrawer } = useLayoutService();
  const {
    data: categories,
    error,
    isLoading,
  } = useSWR('/api/products/categories');

  if (error) return error.message;
  if (isLoading || !categories) return 'Loading...';

  return (
    <div className='relative flex flex-col justify-between min-h-full w-80 bg-base-200 p-4 pb-24 text-base-content'>

      <ul className='menu'>
        <li>
          <h2 className='text-xl mb-2'>Shop Categories</h2>
        </li>
        {categories.map((category: string) => (
          <li key={category}>
            <Link href={`/search?category=${category}`} onClick={toggleDrawer}>
              {category}
            </Link>
          </li>
        ))}
      </ul>

      {/* Contact Information */}
      {/* Contact Information */}
<div className="relative z-10 mt-6 border-t pt-4 text-sm space-y-2 bg-base-200">
  <div>
    <span className="font-medium">Email:</span> info@kashaffabrics.com
  </div>
  <div>
    <span className="font-medium">Phone:</span> +92 300 1234567
  </div>
  <div>
    <span className="font-medium">Branch 1:</span><br />
    123 Main Bazaar, Faisalabad, Pakistan
  </div>
  <div>
    <span className="font-medium">Branch 2:</span><br />
    456 Commercial Area, Lahore, Pakistan
  </div>
</div>

    </div>
  );
};

export default Sidebar;
