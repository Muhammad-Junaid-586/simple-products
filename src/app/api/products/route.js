import connectDB from '@/lib/dbConnect';
import { Product } from '@/lib/model/product';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();

  try {
    const data = await Product.find();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  await connectDB();

  try {
    const { name, price, discount, category, description } = await request.json();

    console.log('Received:', { name, price, discount, category, description });

    const product = new Product({
      name,
      price,
      category,
      discount,
      description,
    });

    await product.save();

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
