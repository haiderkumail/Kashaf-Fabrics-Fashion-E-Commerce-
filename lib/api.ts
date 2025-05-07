// lib/api.ts
import { Product } from '@/lib/models/ProductModel'; // Adjust import according to your structure

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    // Assuming you're using a REST API to fetch data
    const response = await fetch(`https://your-api-endpoint.com/products/${slug}`);

    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }

    const product: Product = await response.json();
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

