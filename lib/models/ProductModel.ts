import mongoose, { Schema, model, models } from 'mongoose';

export interface Product {
  _id?: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  category: string;
  brand: string;
  countInStock: number;
  description: string;
  rating: number;
  numReviews: number;
  isFeatured?: boolean;
  featuredImage?: string;
  createdAt?: string;
  updatedAt?: string;
  colors?: { name: string; imageUrl: string }[];  // Update colors to be an array of objects with 'name' and 'imageUrl'
  sizes?: string[];  // Sizes will remain as an array of strings
}

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    slug: String,
    price: Number,
    category: String,
    image: String,
    brand: String,
    countInStock: Number,
    description: String,
    colors: [
      {
        name: { type: String, required: true },
        imageUrl: { type: String, required: true },
      }
    ],
    
    sizes: [{ type: String }], // Array of strings for sizes
  },
  {
    timestamps: true,
  }
);

const ProductModel = models.Product || model<Product>('Product', ProductSchema);
export default ProductModel;
