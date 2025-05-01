import Image from 'next/image';
import Link from 'next/link';

import Overlay from './Overlay';
import Fragrance from '../../public/images/categories/Fragrance.jpg';
import readytowear from '../../public/images/categories/readytowear.jpg';
import wedding from '../../public/images/categories/wedding.jpg';

const Categories = () => {
  return (
    <div className='grid auto-rows-[300px] grid-cols-2 gap-4 md:auto-rows-[330px] md:grid-cols-4'>
      <Link
        href='/search?category=Ready to Wear'
        className='group relative col-span-2 row-span-1 overflow-hidden md:row-span-2'
      >
        <Image
          src={readytowear}
          alt='Collection of readytowear'
          width={500}
          height={500}
          className='h-full w-full object-cover'
          placeholder='blur'
          loading='lazy'
        />
        <Overlay category='Ready to Wear' />
      </Link>
      <Link
        href='/search?category=Wedding'
        className='group relative col-span-2 overflow-hidden'
      >
        <Image
          src={wedding}
          alt='Collection of wedding'
          width={500}
          height={500}
          className='h-full w-full object-cover'
          placeholder='blur'
          loading='lazy'
        />
        <Overlay category='Wedding' />
      </Link>
      <Link
        href='/search?category=Fragrance'
        className='group relative col-span-2 overflow-hidden'
      >
        <Image
          src={Fragrance}
          alt='Collection of Fragrance'
          width={500}
          height={500}
          className='h-full w-full object-cover'
          placeholder='blur'
          loading='lazy'
        />
        <Overlay category='Fragrance' />
      </Link>
    </div>
  );
};

export default Categories;
