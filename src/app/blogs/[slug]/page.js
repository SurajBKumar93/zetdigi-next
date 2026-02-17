import Image from 'next/image';
import { notFound } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { getAllBlogs, getBlogBySlug } from '@/lib/blogData';

export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  return blogs.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    return {
      title: 'Blog Not Found - ZETDIGI',
    };
  }

  return {
    title: `${post.title} - ZETDIGI`,
    description: post.excerpt,
    keywords: `${post.title.toLowerCase()}, amazon blog, zetdigi`,
  };
}

// Helper function to decode HTML entities (server-safe)
function decodeHTMLEntities(text) {
  // Replace common HTML entities
  const entities = {
    '&nbsp;': ' ',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
  };

  let decoded = text;
  for (const [entity, char] of Object.entries(entities)) {
    decoded = decoded.replace(new RegExp(entity, 'g'), char);
  }

  // Handle numeric entities like &#160;
  decoded = decoded.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));

  // Handle hex entities like &#x00A0;
  decoded = decoded.replace(/&#x([0-9A-Fa-f]+);/g, (match, hex) => String.fromCharCode(parseInt(hex, 16)));

  return decoded;
}

function parseHTMLContent(htmlContent) {
  // Decode HTML entities first
  let decodedContent = htmlContent;
  try {
    decodedContent = decodeHTMLEntities(htmlContent);
  } catch (e) {
    decodedContent = htmlContent;
  }

  // Remove empty paragraphs and clean up
  decodedContent = decodedContent.replace(/<p><br><\/p>/g, '').replace(/<p>\s*<\/p>/g, '');

  const elements = [];
  let keyCounter = 0;

  // Recursive function to process inline formatting (strong, em, u) within text
  const processInlineFormatting = (text) => {
    if (!text || typeof text !== 'string') return text;

    const parts = [];
    let currentIndex = 0;

    // Regex for inline tags
    const inlineRegex = /<(strong|em|u)>(.*?)<\/\1>/g;
    let match;

    while ((match = inlineRegex.exec(text)) !== null) {
      // Add text before the tag
      if (match.index > currentIndex) {
        parts.push(text.substring(currentIndex, match.index));
      }

      const [, tagName, content] = match;

      // Recursively process the content for nested tags
      const processedContent = processInlineFormatting(content);

      // Add the formatted content
      if (tagName === 'strong') {
        parts.push(<strong key={`strong-${keyCounter++}`} className="font-bold text-gray-900">{processedContent}</strong>);
      } else if (tagName === 'em') {
        parts.push(<em key={`em-${keyCounter++}`} className="italic">{processedContent}</em>);
      } else if (tagName === 'u') {
        parts.push(<u key={`u-${keyCounter++}`}>{processedContent}</u>);
      }

      currentIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (currentIndex < text.length) {
      parts.push(text.substring(currentIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  // Parse block-level HTML tags
  const blockRegex = /<(h1|h2|h3|h4|h5|h6|p|blockquote)([^>]*)>(.*?)<\/\1>/gs;
  let match;

  while ((match = blockRegex.exec(decodedContent)) !== null) {
    const [, tag, , content] = match;

    switch (tag) {
      case 'h1':
        elements.push(
          <h2 key={keyCounter++} className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-10 mb-5">
            {processInlineFormatting(content)}
          </h2>
        );
        break;
      case 'h2':
        elements.push(
          <h2 key={keyCounter++} className="text-2xl sm:text-3xl font-bold text-gray-900 mt-8 mb-4">
            {processInlineFormatting(content)}
          </h2>
        );
        break;
      case 'h3':
        elements.push(
          <h3 key={keyCounter++} className="text-xl sm:text-2xl font-bold text-gray-900 mt-6 mb-3">
            {processInlineFormatting(content)}
          </h3>
        );
        break;
      case 'h4':
        elements.push(
          <h4 key={keyCounter++} className="text-lg sm:text-xl font-bold text-gray-900 mt-5 mb-2">
            {processInlineFormatting(content)}
          </h4>
        );
        break;
      case 'p':
        if (content.trim()) {
          elements.push(
            <p key={keyCounter++} className="text-base sm:text-lg text-gray-800 leading-relaxed mb-5" style={{ textAlign: 'justify' }}>
              {processInlineFormatting(content)}
            </p>
          );
        }
        break;
      case 'blockquote':
        elements.push(
          <blockquote key={keyCounter++} className="border-l-4 border-blue-500 pl-4 italic text-gray-700 my-4">
            {processInlineFormatting(content)}
          </blockquote>
        );
        break;
    }
  }

  return elements.length > 0 ? elements : (
    <p className="text-base sm:text-lg text-gray-800 leading-relaxed" style={{ textAlign: 'justify' }}>
      {processInlineFormatting(decodedContent)}
    </p>
  );
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  // Remove all h1 tags from content since we display the title separately
  let cleanedContent = post.content;
  cleanedContent = cleanedContent.replace(/<h1[^>]*>.*?<\/h1>/gi, '');

  const contentElements = parseHTMLContent(cleanedContent);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <Image
        src={post.image}
        alt={post.title}
        width={1200}
        height={600}
        className="w-full container-custom h-auto object-cover"
        loading="eager"
        priority
      />

      <main className="bg-white">
        <article className="container-custom max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Meta Info */}
          <div className="mb-4 flex items-center gap-2 text-xs sm:text-sm text-gray-600">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{post.author}</span>
            <span className="text-gray-400">|</span>
            <time dateTime={post.date}>{post.date}</time>
            {post.category && (
              <>
                <span className="text-gray-400">|</span>
                <span className="font-medium text-blue-600">{post.category}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="mb-6 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            {post.title}
          </h1>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-800 leading-relaxed space-y-5">
              {contentElements}
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
