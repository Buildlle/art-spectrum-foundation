import { NextRequest, NextResponse } from 'next/server';
import { db, contentBlocks } from '@/lib/db';
import { eq } from 'drizzle-orm';

// GET specific content block by key
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const { key } = await params;
    const content = await db.select().from(contentBlocks).where(eq(contentBlocks.key, key));

    if (content.length === 0) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    }

    return NextResponse.json(content[0]);
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}

// DELETE content block
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const { key } = await params;
    const deleted = await db.delete(contentBlocks).where(eq(contentBlocks.key, key)).returning();

    if (deleted.length === 0) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Content deleted successfully' });
  } catch (error) {
    console.error('Error deleting content:', error);
    return NextResponse.json({ error: 'Failed to delete content' }, { status: 500 });
  }
}