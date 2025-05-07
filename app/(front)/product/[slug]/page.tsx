import { notFound } from 'next/navigation';
import { getPlaiceholder } from 'plaiceholder';

import productService from '@/lib/services/productService';
import { convertDocToObj } from '@/lib/utils';

import ProductClient from './ProductClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const dynamicParams = true;



export async function generateStaticParams() {
  const products = await productService.getAll();
  return products.map((product: any) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const slug = params.slug;  // No need to await here
  const product = await productService.getBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product does not exist.',
    };
  }

  return {
    title: product.name,
    description: product.description,
  };
}


const ProductPage = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug; // No need to await here
  const product = await productService.getBySlug(slug);

  if (!product) {
    notFound(); // This will trigger a 404 page if product is not found
  }

  const buffer = await fetch(product.image).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );
  const { base64 } = await getPlaiceholder(buffer);

  return <ProductClient product={convertDocToObj(product)} base64={base64} />;
};

export default ProductPage;
