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
  colors?: { name: string; imageUrl: string }[];  // Colors with name and imageUrl
  sizes?: string[];
  averageRating: number; // average from all users
  discount: number;
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
    averageRating: Number,
    numReviews: Number, // ✅ Fixed typo here
    discount: Number,
    colors: [
      {
        name: { type: String, required: true },
        imageUrl: { type: String, required: true },
      },
    ],
    sizes: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const ProductModel = models.Product || model<Product>('Product', ProductSchema);
export default ProductModel;
