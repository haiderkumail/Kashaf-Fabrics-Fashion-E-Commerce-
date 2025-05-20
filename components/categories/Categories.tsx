// import Image from 'next/image';
// import Link from 'next/link';

// import Overlay from './Overlay';
// import Fragrance from '../../public/images/categories/Fragrance.jpg';
// import readytowear from '../../public/images/categories/readytowear.jpg';
// import wedding from '../../public/images/categories/wedding.jpg';

// const Categories = () => {
//   return (
//     <div className='grid auto-rows-[300px] grid-cols-2 gap-4 md:auto-rows-[330px] md:grid-cols-4'>
//       <Link
//         href='/search?category=Ready to Wear'
//         className='group relative col-span-2 row-span-1 overflow-hidden md:row-span-2'
//       >
//         <Image
//           src={readytowear}
//           alt='Collection of readytowear'
//           width={500}
//           height={500}
//           className='h-full w-full object-cover'
//           placeholder='blur'
//           loading='lazy'
//         />
//         <Overlay category='Ready to Wear' />
//       </Link>
//       <Link
//         href='/search?category=Wedding'
//         className='group relative col-span-2 overflow-hidden'
//       >
//         <Image
//           src={wedding}
//           alt='Collection of wedding'
//           width={500}
//           height={500}
//           className='h-full w-full object-cover'
//           placeholder='blur'
//           loading='lazy'
//         />
//         <Overlay category='Wedding' />
//       </Link>
//       <Link
//         href='/search?category=Fragrance'
//         className='group relative col-span-2 overflow-hidden'
//       >
//         <Image
//           src={Fragrance}
//           alt='Collection of Fragrance'
//           width={500}
//           height={500}
//           className='h-full w-full object-cover'
//           placeholder='blur'
//           loading='lazy'
//         />
//         <Overlay category='Fragrance' />
//       </Link>
//     </div>
//   );
// };

// export default Categories;

import Link from 'next/link';

import ProductItem from '@/components/products/ProductItem';
import productServices from '@/lib/services/productService';

function sanitizeProduct(product: any) {
  return {
    ...product,
    _id: product._id.toString(),
    colors: product.colors?.map((color: any) => ({
      ...color,
      _id: color._id.toString(),
    })),
    sizes: product.sizes || [],
  };
}

const sortOrders = ['newest', 'lowest', 'highest', 'rating'];

export async function generateMetadata({
  searchParams,
}: {
  searchParams: {
    category: string;
    sort: string;
    page: string;
  };
}) {
  const { category = 'all', sort = 'newest', page = '1' } = await searchParams;

  if (category !== 'all') {
    return {
      title: `Products in ${category} Category`,
    };
  } else {
    return {
      title: 'All Products',
    };
  }
}

export default async function Categories() {
  const { products } = await productServices.getByQuery({
    q: '',
    category: 'all',
    price: '',
    rating: '',
    sort: 'newest',
    page: '1',
    limit: 20, // you can keep this high just in case
  });

  if (!products) {
    return <div className="text-center py-10 text-lg">Loading products...</div>;
  }

  // ✅ Hard-limit to first 8 products
  const visibleProducts = products.slice(0, 10);

return (
  <div className="container mx-auto px-4">
<h2
  className="text-2xl sm:text-3xl font-medium text-center mb-6 uppercase"
  style={{ fontFamily: "'Montserrat', sans-serif" }}
>
  Best Products for Your Wardrobe
</h2>




    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">

      {visibleProducts.map((product) => (
        <div key={product.slug} className="flex justify-center">
          <div className="w-[150%] sm:w-full">
            <ProductItem product={sanitizeProduct(product)} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

}
