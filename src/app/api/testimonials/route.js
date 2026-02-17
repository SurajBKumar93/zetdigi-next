import { NextResponse } from 'next/server';
import * as dataStore from '@/lib/dataStore';

export async function GET() {
  try {
    const data = await dataStore.getTestimonials();
    // Sort by order field if it exists
    const sortedData = data.sort((a, b) => (a.order || 0) - (b.order || 0));
    return NextResponse.json(sortedData);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
