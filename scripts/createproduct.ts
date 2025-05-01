import mongoose from 'mongoose';

import ProductModel from '../lib/models/ProductModel'; // Adjust path as needed

// Example product data to insert
const exampleProduct = {
  name: 'Stylish Shirt',
  slug: 'stylish-shirt',
  image: 'https://example.com/product-image.png',
  price: 29.99,
  brand: 'Fashion Brand',
  description: 'A stylish and comfortable shirt.',
  category: 'Men\'s Fashion',
  rating: 4.5,
  numReviews: 120,
  countInStock: 50,
  colors: ['Red', 'Blue', 'Black'],
  sizes: ['S', 'M', 'L', 'XL'],
};

const createProduct = async () => {
  try {
    await mongoose.connect('mongodb+srv://kumail:kumail@cluster0.wx3fa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    
    // Create a new product
    const newProduct = new ProductModel(exampleProduct);
    await newProduct.save();
    console.log('Product created:', newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
  } finally {
    mongoose.connection.close();
  }
};

createProduct();
