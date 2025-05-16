import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

import dbConnect from '@/lib/dbConnect';
import OrderModel from '@/lib/models/OrderModel';


const sendPaymentSuccessEmail = async (order: any) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const itemsHtml = order.items
    .map(
      (item: any) =>
        `<li>${item.name} (${item.color || ''} ${item.size || ''}) - Qty: ${item.qty} - Price: ${item.price}</li>`
    )
    .join('');

  const html = `
    <h1>Payment Received</h1>
    <p><strong>Order ID:</strong> ${order._id}</p>
    <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
    <p><strong>Shipping Address:</strong><br/>
      ${order.shippingAddress.fullName}<br/>
      ${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}<br/>
      Phone: ${order.shippingAddress.phoneNumber}
    </p>
    <p><strong>Order Items:</strong></p>
    <ul>${itemsHtml}</ul>
    <p><strong>Total Paid:</strong> ${order.totalPrice}</p>
  `;

  await transporter.sendMail({
    from: `"Your Store" <${process.env.SMTP_USER}>`,
    to: process.env.ORDER_NOTIFICATION_EMAIL,
    subject: `Payment Successful - Order ${order._id}`,
    html,
  });
};

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
  const { id } = params;
  const { paymentStatus } = await req.json();

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ message: 'Invalid order ID' }, { status: 400 });
  }

  try {
    await dbConnect();

    const order = await OrderModel.findById(id);

    if (!order) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }

    const wasPaid = order.isPaid;

    order.isPaid = paymentStatus === 'Paid';
    order.paidAt = paymentStatus === 'Paid' ? new Date() : null;

    const updatedOrder = await order.save();

    // Only send email if payment just changed to Paid
    if (paymentStatus === 'Paid' && !wasPaid) {
      await sendPaymentSuccessEmail(updatedOrder);
    }

    return NextResponse.json({ message: 'Payment updated successfully', order: updatedOrder }, { status: 200 });
  } catch (error) {
    console.error('Error updating payment status:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
