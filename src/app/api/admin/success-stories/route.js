import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import * as dataStore from '@/lib/dataStore';

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await dataStore.getSuccessStories();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const items = await dataStore.getSuccessStories();
    
    const newItem = {
      id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1,
      ...body,
      order: items.length + 1,
    };

    items.push(newItem);
    await dataStore.saveSuccessStories(items);

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const items = await dataStore.getSuccessStories();
    const index = items.findIndex(item => item.id === body.id);

    if (index === -1) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    items[index] = { ...items[index], ...body };
    await dataStore.saveSuccessStories(items);

    return NextResponse.json(items[index]);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id'));

    const items = await dataStore.getSuccessStories();
    const filteredItems = items.filter(item => item.id !== id);
    await dataStore.saveSuccessStories(filteredItems);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
