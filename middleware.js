export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/admin/dashboard/:path*',
    '/admin/portfolio/:path*',
    '/admin/testimonials/:path*',
    '/admin/blogs/:path*',
    '/admin/success-stories/:path*',
    '/admin/features/:path*',
    '/admin/faqs/:path*',
    '/admin/hero/:path*',
  ],
};
