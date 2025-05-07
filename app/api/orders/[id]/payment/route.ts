import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

import dbConnect from '@/lib/dbConnect';
import OrderModel from '@/lib/models/OrderModel';


export async function PATCH(req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
  const { id } = params; // This will grab the dynamic [id] from the URL
  const { paymentStatus } = await req.json(); // Get payment status from the request body

  // Check if ID is a valid MongoDB ObjectId
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ message: 'Invalid order ID' }, { status: 400 });
  }

  try {
    // Connect to the database
    await dbConnect();

    // Find the order by its ID
    const order = await OrderModel.findById(id);

    // If no order found, return a 404 error
    if (!order) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }

    // Update the order's payment status and paidAt date
    order.isPaid = paymentStatus === 'Paid'; // Assuming 'Paid' means successful payment
    order.paidAt = paymentStatus === 'Paid' ? new Date() : null; // Only set paidAt if payment is successful

    // Save the updated order to the database
    const updatedOrder = await order.save();

    // Respond with a success message and updated order details
    return NextResponse.json({ message: 'Payment updated successfully', order: updatedOrder }, { status: 200 });
  } catch (error) {
    console.error('Error updating payment status:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
