import { notFound } from 'next/navigation';
import { getPlaiceholder } from 'plaiceholder';

import productService from '@/lib/services/productService';
import { convertDocToObj } from '@/lib/utils';

import ProductClient from './ProductClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const dynamicParams = true;

// const product = await productService.getBySlug(slug);
// const topRated = await productService.getTopRated();

export async function generateStaticParams() {
  const products = await productService.getAll();
  return products.map((product: any) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const slug = params.slug;
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
  const slug = params.slug;
  const product = await productService.getBySlug(slug);

  if (!product) {
    notFound();
  }

  const buffer = await fetch(product.image).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );
  const { base64 } = await getPlaiceholder(buffer);

  const topRated = await productService.getTopRated();

  return (
  <ProductClient
    product={convertDocToObj(product)}
    base64={base64}
    topRated={topRated.map(convertDocToObj)}
  />
  );
};

export default ProductPage;
