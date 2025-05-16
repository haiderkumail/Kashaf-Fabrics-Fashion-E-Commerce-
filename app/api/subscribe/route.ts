import { NextRequest, NextResponse } from 'next/server';

// Temporary in-memory store for demo (will reset on server restart)
let subscribers: string[] = [];

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (
      !email ||
      typeof email !== 'string' ||
      !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    ) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    if (!subscribers.includes(email)) {
      subscribers.push(email);
    }

    return NextResponse.json({ message: 'Subscribed successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
