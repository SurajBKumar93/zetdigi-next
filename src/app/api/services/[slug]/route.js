import { NextResponse } from 'next/server';
import * as dataStore from '@/lib/dataStore';

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    const service = await dataStore.getServiceBySlug(slug);

    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    // Only return if published
    if (service.status !== 'published') {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    return NextResponse.json(service);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
