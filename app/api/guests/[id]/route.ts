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
