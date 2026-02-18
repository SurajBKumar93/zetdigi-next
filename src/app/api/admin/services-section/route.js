import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import * as dataStore from '@/lib/dataStore';

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await dataStore.getServicesSection();
    return NextResponse.json(data);
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
    await dataStore.saveServicesSection(body);

    return NextResponse.json(body);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
