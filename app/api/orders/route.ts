import mongoose from 'mongoose';

import dbConnect from '@/lib/dbConnect';
import OrderModel from '@/lib/models/OrderModel';
import ProductModel from '@/lib/models/ProductModel';
import { round2 } from '@/lib/utils';

const calcPrices = (orderItems: any[]) => {
  const itemsPrice = round2(orderItems.reduce((acc, item) => acc + item.price * item.qty, 0));
  const shippingPrice = round2(itemsPrice > 100 ? 0 : 10);
  const taxPrice = round2(Number((0.15 * itemsPrice).toFixed(2)));
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};

export const POST = async (req: Request) => {
  await dbConnect();

  try {
    const payload = await req.json();

    const dbOrderItems = [];

    for (const x of payload.items) {
      const product = await ProductModel.findById(x._id);

      if (!product) {
        return Response.json({ message: `Product not found: ${x.name}` }, { status: 404 });
      }

      if (product.countInStock < x.qty) {
        return Response.json(
          { message: `Not enough stock for ${product.name}` },
          { status: 400 }
        );
      }

      product.countInStock -= x.qty;
      await product.save();

      dbOrderItems.push({
        ...x,
        product: product._id,
        price: product.price,
        _id: undefined,
      });
    }

    const { itemsPrice, taxPrice, shippingPrice, totalPrice } = calcPrices(dbOrderItems);

    const newOrder = new OrderModel({
      items: dbOrderItems,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      shippingAddress: payload.shippingAddress,
      paymentMethod: payload.paymentMethod,
      user: payload.userId || null, // optionally accept user ID from client or set as null for guest
    });

    const createdOrder = await newOrder.save();
    return Response.json({ message: 'Order has been created', order: createdOrder }, { status: 201 });
  } catch (err: any) {
    console.error('Error creating order:', err);
    return Response.json({ message: err.message }, { status: 500 });
  }
};
