import mongoose from 'mongoose';
import nodemailer from 'nodemailer';

import dbConnect from '@/lib/dbConnect';
import OrderModel from '@/lib/models/OrderModel';
import ProductModel from '@/lib/models/ProductModel';
import { round2 } from '@/lib/utils';

const calcPrices = (orderItems: any[]) => {
  const itemsPrice = round2(orderItems.reduce((acc, item) => acc + item.price * item.qty, 0));
  const shippingPrice = round2(itemsPrice > 10000 ? 500 : 0);
  const taxPrice = round2(Number((0 * itemsPrice).toFixed(2)));
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};

const sendOrderEmail = async (order: any) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Generate a Google Maps link for the address
  const addressQuery = encodeURIComponent(
    `${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`
  );
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${addressQuery}`;

  const itemsHtml = order.items
    .map(
      (item: any) => `
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;">
            <img src="${item.image}" alt="${item.name}" width="60" height="60" style="object-fit: contain;" />
          </td>
          <td style="padding: 10px; border: 1px solid #ddd;">
            ${item.name} (${item.color || ''} ${item.size || ''})
          </td>
          <td style="padding: 10px; border: 1px solid #ddd;">${item.qty}</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${item.price}</td>
        </tr>
      `
    )
    .join('');

  const html = `
    <h1>New Order Placed</h1>
    <p><strong>Order ID:</strong> ${order._id}</p>
    <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>

    <p><strong>Shipping Address:</strong><br/>
      ${order.shippingAddress.fullName}<br/>
      <a href="${mapsUrl}" target="_blank" style="color: blue; text-decoration: underline;">
        ${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}
      </a><br/>
      Phone: ${order.shippingAddress.phoneNumber}<br/>
      Email: ${order.shippingAddress.email}
    </p>

    <p><strong>Order Items:</strong></p>
    <table style="border-collapse: collapse; width: 100%; margin-top: 10px;">
      <thead>
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px;">Image</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Product</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Quantity</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Price</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHtml}
      </tbody>
    </table>

    <p><strong>Total Price:</strong> ${order.totalPrice}</p>
  `;

  const recipients = [process.env.ORDER_NOTIFICATION_EMAIL];
  if (order.shippingAddress.email) {
    recipients.push(order.shippingAddress.email);
  }

  await transporter.sendMail({
    from: `"Your Store" <${process.env.SMTP_USER}>`,
    to: recipients.join(','),
    subject: `New Order Received - ${order._id}`,
    html,
  });
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

    // Make sure customer email is included in shippingAddress
    // You can also validate here or rely on front-end validation
    if (!payload.shippingAddress.email) {
      return Response.json({ message: 'Customer email is required in shippingAddress.email' }, { status: 400 });
    }

    const newOrder = new OrderModel({
      items: dbOrderItems,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      shippingAddress: payload.shippingAddress,
      paymentMethod: payload.paymentMethod,
      user: payload.userId || null,
    });

    const createdOrder = await newOrder.save();

    // Send email notification
    await sendOrderEmail(createdOrder);

    return Response.json({ message: 'Order has been created', order: createdOrder }, { status: 201 });
  } catch (err: any) {
    console.error('Error creating order:', err);
    return Response.json({ message: err.message }, { status: 500 });
  }
};
