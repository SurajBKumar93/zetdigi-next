import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

export async function POST(request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file');
    const category = formData.get('category') || 'general';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/\s+/g, '-');

    // Detect image format from file extension
    const ext = path.extname(originalName).toLowerCase();
    const isPng = ext === '.png';
    const isWebp = ext === '.webp';

    const filename = `${timestamp}-${originalName}`;

    // Create upload directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', category);
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      // Directory might already exist
    }

    const filepath = path.join(uploadDir, filename);

    // Process image with sharp (optimize and resize if needed)
    const sharpInstance = sharp(buffer)
      .resize(1920, 1920, {
        fit: 'inside',
        withoutEnlargement: true,
      });

    // Preserve format based on original file type
    if (isPng) {
      // Keep PNG format to preserve transparency
      await sharpInstance.png({ quality: 85, compressionLevel: 8 }).toFile(filepath);
    } else if (isWebp) {
      // Keep WebP format to preserve transparency
      await sharpInstance.webp({ quality: 85 }).toFile(filepath);
    } else {
      // Convert to JPEG for other formats (JPG, JPEG, etc.)
      await sharpInstance.jpeg({ quality: 85 }).toFile(filepath);
    }

    // Return public URL
    const publicUrl = `/uploads/${category}/${filename}`;

    return NextResponse.json({ url: publicUrl }, { status: 200 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
