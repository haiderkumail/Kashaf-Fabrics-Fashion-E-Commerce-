import nodemailer from 'nodemailer';

type Order = {
  _id: string;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
  };
  items: {
    name: string;
    qty: number;
  }[];
  totalPrice: number;
  paymentMethod: string;
};

export async function sendOrderEmail(order: Order) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // true for 465, false for 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const itemList = order.items
    .map((item) => `- ${item.name} x${item.qty}`)
    .join('\n');

  // Conditional message about shipping fees if totalPrice is above 10,000
  const shippingFeeNotice =
    order.totalPrice >= 10000
      ? '\n\n⚠️ Note: Since your total order amount exceeds PKR 10,000, a shipping fee of PKR 500 will be charged.'
      : '';

  const mailOptions = {
    from: `"Kashaf Fabrics" <${process.env.SMTP_USER}>`,
    to: process.env.ORDER_NOTIFICATION_EMAIL,
    subject: `🛒 New Order Received: ${order._id}`,
    text: `
New order placed by ${order.shippingAddress.fullName}.

📦 Order Details:
${itemList}

💰 Total: $${order.totalPrice}
💳 Payment Method: ${order.paymentMethod}

🏠 Shipping Address:
${order.shippingAddress.address},
${order.shippingAddress.city}
${shippingFeeNotice}
    `.trim(),
  };

  return transporter.sendMail(mailOptions);
}
