// /pages/api/admin/orders/[id]/deliver.ts
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import OrderModel from '@/lib/models/OrderModel';

export const PUT = auth(async (...args: any) => {
  const [req, { params }] = args;

  // Check if the user is an admin
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: 'Unauthorized' },
      {
        status: 401,
      },
    );
  }

  try {
    // Connect to the database
    await dbConnect();

    const order = await OrderModel.findById(params.id);
    if (!order) {
      return Response.json(
        { message: 'Order not found' },
        {
          status: 404,
        },
      );
    }

    // If the order is already marked as delivered
    if (order.isDelivered) {
      return Response.json(
        { message: 'Order already marked as delivered' },
        {
          status: 400,
        },
      );
    }

    // Mark the order as delivered and update the delivery time
    order.isDelivered = true;
    order.deliveredAt = new Date();

    // Save the updated order status
    const updatedOrder = await order.save();

    return Response.json(updatedOrder);
  } catch (err: any) {
    return Response.json(
      { message: err.message },
      {
        status: 500,
      },
    );
  }
}) as any;
