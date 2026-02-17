import fs from 'fs';
import path from 'path';
import MarqueeDisplay from './MarqueeDisplay';

async function getSuccessImages() {
  try {
    const publicDir = path.join(process.cwd(), 'public', 'analysis');
    const files = fs.readdirSync(publicDir);

    // Filter for image files and map to full paths
    const images = files
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .map(file => `/analysis/${file}`)
      .sort();

    return images;
  } catch (error) {
    console.error('Failed to read images:', error);
    return [];
  }
}

export default async function AmazonSuccessMarquee() {
  const images = await getSuccessImages();

  if (images.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container-custom mx-auto px-6 mb-12">
        <h2 className="text-4xl font-bold text-center text-black">
          Proven <span className="text-blue-600">Amazon Success</span>
        </h2>
      </div>

      {/* Full Width Marquee */}
      <MarqueeDisplay images={images} />
    </section>
  );
}
