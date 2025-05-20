import nodemailer from 'nodemailer';

type Order = {
  _id: string;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode?: string;
    country?: string;
    phoneNumber?: string;
    email?: string;
  };
  items: {
    name: string;
    qty: number;
    price: number;
    image: string;
    color?: string;
    size?: string;
  }[];
  totalPrice: number;
  paymentMethod: string;
};

export async function sendOrderEmail(order: Order) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const fullAddress = `${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode ?? ''}, ${order.shippingAddress.country ?? ''}`.trim();
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

  const itemListHTML = order.items
    .map(item => {
      const colorSize =
        item.color && item.size
          ? ` (${item.color}, ${item.size})`
          : item.color
          ? ` (${item.color})`
          : item.size
          ? ` (${item.size})`
          : '';

      return `
        <tr>
          <td style="text-align:center;">
            <img src="${item.image}" alt="${item.name}" width="60" height="60" style="display:block; border:none; outline:none;" />
          </td>
          <td>${item.name}${colorSize}</td>
          <td style="text-align:center;">${item.qty}</td>
          <td style="text-align:right;">PKR ${item.price.toFixed(2)}</td>
        </tr>`;
    })
    .join('');

  const shippingFeeNotice =
    order.totalPrice >= 10000
      ? `<p style="color: red;"><strong>⚠️ Note:</strong> Since your total order amount exceeds PKR 10,000, a shipping fee of PKR 500 will be charged.</p>`
      : '';

  const mailOptions = {
    from: `"Kashaf Fabrics" <${process.env.SMTP_USER}>`,
    to: process.env.ORDER_NOTIFICATION_EMAIL,
    subject: `🛒 New Order Received: ${order._id}`,
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
        <h2>🛍️ New Order: ${order._id}</h2>
        <p><strong>Customer:</strong> ${order.shippingAddress.fullName}</p>

        <h3>📦 Order Items:</h3>
        <table cellpadding="10" cellspacing="0" border="1" style="border-collapse: collapse; width: 100%;">
          <thead>
            <tr style="background-color: #f0f0f0;">
              <th>Image</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemListHTML}
          </tbody>
        </table>

        <h3>💳 Payment Method:</h3>
        <p>${order.paymentMethod}</p>

        <h3>💰 Total Price:</h3>
        <p>PKR ${order.totalPrice.toFixed(2)}</p>

        ${shippingFeeNotice}

        <h3>🏠 Shipping Address:</h3>
        <p>
          <strong>Name:</strong> ${order.shippingAddress.fullName}<br/>
          <strong>Address:</strong> 
          <a href="${mapsLink}" target="_blank" style="color: #1a0dab; text-decoration: underline;">
            ${order.shippingAddress.address}, ${order.shippingAddress.city}
          </a><br/>
          ${order.shippingAddress.postalCode ? `<strong>Postal Code:</strong> ${order.shippingAddress.postalCode}<br/>` : ''}
          ${order.shippingAddress.country ? `<strong>Country:</strong> ${order.shippingAddress.country}<br/>` : ''}
          ${order.shippingAddress.phoneNumber ? `<strong>Phone:</strong> ${order.shippingAddress.phoneNumber}<br/>` : ''}
          ${order.shippingAddress.email ? `<strong>Email:</strong> ${order.shippingAddress.email}` : ''}
        </p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
}
