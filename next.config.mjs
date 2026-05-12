/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },

  // Canonical host: www.easy-move-florida.com. Bare apex 301 → www so Google
  // doesn't see two hosts. Trailing slashes get normalized off.
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'easy-move-florida.com' }],
        destination: 'https://www.easy-move-florida.com/:path*',
        permanent: true,
      },

      // Legacy Wix URLs from the previous site. Bing & Google indexed these
      // before migration; 301 → closest current equivalent so we keep any
      // link equity and stop serving 404s in SERPs.
      { source: '/services-1',     destination: '/services',         permanent: true },
      { source: '/plans-pricing',  destination: '/pricing',          permanent: true },
      { source: '/book-online',    destination: '/quote',            permanent: true },
      { source: '/privacy-terms',  destination: '/privacy',          permanent: true },
      { source: '/faq',            destination: '/#faq',             permanent: true },
      // Wix sometimes prefixed pages with /post or /blog-1. Catch-alls.
      { source: '/blog-1/:slug*',  destination: '/blog/:slug*',      permanent: true },
      { source: '/post/:slug*',    destination: '/blog/:slug*',      permanent: true },
      { source: '/copy-of-:slug*', destination: '/',                 permanent: true },
    ];
  },

  async headers() {
    const securityHeaders = [
      { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()',
      },
    ];

    return [
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Long-cache static assets (Next image optimizer, fonts)
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // robots.txt and sitemap.xml — short cache, must revalidate
      {
        source: '/(robots.txt|sitemap.xml|llms.txt)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=3600, must-revalidate' },
        ],
      },
      // Security headers apply to every route. Trust signals + clickjacking + MIME sniffing protection.
      // No CSP by default — Tawk.to / GTM / Vercel Analytics / Clarity inject inline scripts; a strict CSP
      // would block them. Add CSP separately when ready (use Report-Only first).
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
