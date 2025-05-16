import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  brand: { type: String, required: true },
  rating: { type: Number, required: true, default: 0 },
  numReviews: { type: Number, required: true, default: 0 },
  countInStock: { type: Number, required: true, default: 0 },
  description: { type: String, required: true },
  isFeatured: { type: Boolean, default: false },
  discount: { type: Number, default: 0 },
  colors: [
    {
      name: { type: String, required: true },
      imageUrl: { type: String, required: true },
    }
  ],
  sizes: [{ type: String }],
  banner: String,
}, { timestamps: true });

const ProductModel = mongoose.models.Product || mongoose.model('Product', productSchema);

export default ProductModel;
