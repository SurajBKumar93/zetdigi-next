import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import * as dataStore from '@/lib/dataStore';

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await dataStore.getTestimonials();
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
    const items = await dataStore.getTestimonials();
    
    const newItem = {
      id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1,
      ...body,
      order: items.length + 1,
    };

    items.push(newItem);
    await dataStore.saveTestimonials(items);

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
    const items = await dataStore.getTestimonials();
    const index = items.findIndex(item => item.id === body.id);

    if (index === -1) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    items[index] = { ...items[index], ...body };
    await dataStore.saveTestimonials(items);

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

    const items = await dataStore.getTestimonials();
    const filteredItems = items.filter(item => item.id !== id);
    await dataStore.saveTestimonials(filteredItems);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
