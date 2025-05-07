// app/api/revalidate-product/route.ts
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { slug } = await req.json();

  try {
    revalidatePath(`/product/${slug}`);
    return NextResponse.json({ message: 'Revalidated successfully' });
  } catch (err: any) {
    return NextResponse.json(
      { message: 'Failed to revalidate', error: err.message },
      { status: 500 }
    );
  }
}
