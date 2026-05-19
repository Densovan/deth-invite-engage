import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Guest } from '@/models/Guest';

export async function GET() {
  try {
    await connectToDatabase();
    const guests = await Guest.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: guests });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch guests' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    
    if (!body.name) {
      return NextResponse.json({ success: false, error: 'Name is required' }, { status: 400 });
    }

    const guestName = body.name.trim();

    // Check for duplicate name
    const existingName = await Guest.findOne({ name: guestName });
    if (existingName) {
      return NextResponse.json({ success: false, error: 'Guest name already exists' }, { status: 400 });
    }

    // Replace spaces with hyphens for the slug
    let baseSlug = guestName.replace(/\s+/g, '-');
    let slug = baseSlug;
    
    // Ensure slug is unique
    let counter = 1;
    let existingGuest = await Guest.findOne({ slug });
    while (existingGuest) {
      slug = `${baseSlug}-${counter}`;
      existingGuest = await Guest.findOne({ slug });
      counter++;
    }

    const guest = await Guest.create({ name: body.name.trim(), slug });
    return NextResponse.json({ success: true, data: guest }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create guest' }, { status: 500 });
  }
}
