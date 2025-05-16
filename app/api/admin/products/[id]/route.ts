import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import ProductModel from '@/lib/models/ProductModel';

export const GET = auth(async (...args: any) => {
  const [req, context] = args;
  const { id } = await context.params; // Make sure to await params

  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json({ message: 'unauthorized' }, { status: 401 });
  }

  await dbConnect();
  const product = await ProductModel.findById(id); // Use awaited id
  if (!product) {
    return Response.json({ message: 'Product not found' }, { status: 404 });
  }

  return Response.json(product);
});

export const PUT = auth(async (...args: any) => {
  const [req, context] = args;
  const { id } = await context.params;

  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json({ message: 'unauthorized' }, { status: 401 });
  }

  const {
    name,
    slug,
    price,
    category,
    image,
    brand,
    countInStock,
    description,
    colors,
    sizes,
    discount,  // <-- added here
  } = await req.json();

  try {
    await dbConnect();
    const product = await ProductModel.findById(id);
    if (!product) {
      return Response.json({ message: 'Product not found' }, { status: 404 });
    }

    product.name = name;
    product.slug = slug;
    product.price = price;
    product.category = category;
    product.image = image;
    product.brand = brand;
    product.countInStock = countInStock;
    product.description = description;
    product.colors = Array.isArray(colors) ? colors : [];
    product.sizes = Array.isArray(sizes) ? sizes : [];

    product.discount = discount !== undefined ? discount : product.discount;// <-- added here

    const updatedProduct = await product.save();
    return Response.json(updatedProduct);
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 500 });
  }
});


export const DELETE = auth(async (...args: any) => {
  const [req, context] = args;
  const { id } = await context.params; // Await params for dynamic id

  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json({ message: 'unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const product = await ProductModel.findById(id);
    if (product) {
      await product.deleteOne();
      return Response.json({ message: 'Product deleted successfully' });
    } else {
      return Response.json({ message: 'Product not found' }, { status: 404 });
    }
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 500 });
  }
});
