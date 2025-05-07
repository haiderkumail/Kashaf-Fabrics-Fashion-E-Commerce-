// app/api/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';

import stripe from '@/lib/stripe'; // Assuming your stripe instance is in lib/stripe.ts

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming request body
    const { items } = await req.json();

    // Create a new Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'usd', // Adjust to your currency
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100, // Stripe expects the amount in the smallest unit (e.g., cents)
        },
        quantity: item.qty,
      })),
      mode: 'payment',
      success_url: `http://localhost:3000/success`,
      cancel_url: `http://localhost:3000/cancel`,
      
    });

    // Respond with the session id so the frontend can proceed
    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Stripe Checkout error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
