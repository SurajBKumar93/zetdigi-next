import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), 'public', 'analysis');
    const files = fs.readdirSync(publicDir);

    // Filter for image files and map to full paths
    const images = files
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .map(file => `/analysis/${file}`)
      .sort(); // Sort to ensure consistent order

    return NextResponse.json({
      success: true,
      images,
      count: images.length
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch images',
        message: error.message
      },
      { status: 500 }
    );
  }
}
