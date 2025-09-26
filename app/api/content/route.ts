import { NextRequest, NextResponse } from 'next/server';
import { db, contentBlocks } from '@/lib/db';
import { eq, and } from 'drizzle-orm';

// GET all content blocks or by page
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');
    const key = searchParams.get('key');

    if (key) {
      const content = await db.select().from(contentBlocks).where(eq(contentBlocks.key, key));
      return NextResponse.json(content[0] || null);
    }

    if (page) {
      const content = await db.select().from(contentBlocks).where(eq(contentBlocks.page, page));
      return NextResponse.json(content);
    }

    const allContent = await db.select().from(contentBlocks);
    return NextResponse.json(allContent);
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}

// POST create new content block
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { key, type, content, metadata, page, position } = body;

    if (!key || !type || !content || !page) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newContent = await db.insert(contentBlocks).values({
      key,
      type,
      content,
      metadata,
      page,
      position,
      isPublished: true,
    }).returning();

    return NextResponse.json(newContent[0]);
  } catch (error) {
    console.error('Error creating content:', error);
    return NextResponse.json({ error: 'Failed to create content' }, { status: 500 });
  }
}

// PUT update content block
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { key, content, metadata } = body;

    if (!key || content === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const updatedContent = await db
      .update(contentBlocks)
      .set({
        content,
        metadata,
        lastModified: new Date(),
      })
      .where(eq(contentBlocks.key, key))
      .returning();

    if (updatedContent.length === 0) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    }

    return NextResponse.json(updatedContent[0]);
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  }
}