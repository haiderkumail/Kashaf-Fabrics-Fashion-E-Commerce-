import mongoose from 'mongoose';

import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import OrderModel from '@/lib/models/OrderModel';

export const GET = auth(async (req: any) => {
  if (!req.auth) {
    return new Response(JSON.stringify({ message: 'unauthorized' }), { status: 401 });
  }

  const { user } = req.auth;

  await dbConnect();

  const orders = await OrderModel.find({
    user: new mongoose.Types.ObjectId(user._id),
  });

  return new Response(JSON.stringify(orders), {
    headers: { 'Content-Type': 'application/json' },
  });
});
