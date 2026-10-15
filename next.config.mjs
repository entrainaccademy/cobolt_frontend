/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'cobolt-backend.onrender.com',
      },
      {
        protocol: 'http',
        hostname: 'cobolt-backend.onrender.com',
      },
      {
        protocol: 'https',
        hostname: '**.onrender.com',
      },
      {
        protocol: 'http',
        hostname: '**.onrender.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      },
    ],
  },
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://cobolt-backend.onrender.com';
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
      {
        source: '/uploads/:path*',
        destination: `${backendUrl}/uploads/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; connect-src 'self' https://cobolt-backend.onrender.com http://cobolt-backend.onrender.com http://localhost:5000 http://127.0.0.1:5000 https://res.cloudinary.com; img-src 'self' data: blob: https://placehold.co https://res.cloudinary.com https://cobolt-backend.onrender.com http://cobolt-backend.onrender.com http://localhost:5000 http://127.0.0.1:5000; media-src 'self' data: blob:; font-src 'self' data:;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
