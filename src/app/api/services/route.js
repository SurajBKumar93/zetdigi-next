import { NextResponse } from 'next/server';
import * as dataStore from '@/lib/dataStore';

export async function GET() {
  try {
    const services = await dataStore.getServices();
    // Return only published services, sorted by order
    const published = services
      .filter(service => service.status === 'published')
      .sort((a, b) => a.order - b.order);
    return NextResponse.json(published);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
