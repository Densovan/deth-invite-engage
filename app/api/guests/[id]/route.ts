import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Guest } from '@/models/Guest';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectToDatabase();
    
    const deletedGuest = await Guest.findByIdAndDelete(id);
    
    if (!deletedGuest) {
      return NextResponse.json({ success: false, error: 'Guest not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete guest' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectToDatabase();
    const body = await request.json();
    
    if (!body.name) {
      return NextResponse.json({ success: false, error: 'Name is required' }, { status: 400 });
    }

    const guestName = body.name.trim();

    // Check for duplicate name (excluding the current guest)
    const existingName = await Guest.findOne({ name: guestName, _id: { $ne: id } });
    if (existingName) {
      return NextResponse.json({ success: false, error: 'Guest name already exists' }, { status: 400 });
    }

    // Generate new slug
    let baseSlug = guestName.replace(/\s+/g, '-');
    let slug = baseSlug;
    
    let counter = 1;
    let existingSlug = await Guest.findOne({ slug, _id: { $ne: id } });
    while (existingSlug) {
      slug = `${baseSlug}-${counter}`;
      existingSlug = await Guest.findOne({ slug, _id: { $ne: id } });
      counter++;
    }

    const updatedGuest = await Guest.findByIdAndUpdate(
      id,
      { name: guestName, slug },
      { new: true }
    );
    
    if (!updatedGuest) {
      return NextResponse.json({ success: false, error: 'Guest not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: updatedGuest });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update guest' }, { status: 500 });
  }
}
