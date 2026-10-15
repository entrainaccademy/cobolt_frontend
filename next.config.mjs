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
<<<<<<< HEAD
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
=======
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
>>>>>>> ca192ae (admin portal)
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
<<<<<<< HEAD
        port: '5000',
=======
>>>>>>> ca192ae (admin portal)
      },
    ],
  },
  async rewrites() {
<<<<<<< HEAD
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
=======
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://cobolt-backend.onrender.com';
>>>>>>> ca192ae (admin portal)
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
<<<<<<< HEAD
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; connect-src 'self' http://localhost:5000 http://127.0.0.1:5000 https://res.cloudinary.com; img-src 'self' data: blob: https://placehold.co https://res.cloudinary.com http://localhost:5000 http://127.0.0.1:5000; media-src 'self' data: blob:; font-src 'self' data:;",
=======
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; connect-src 'self' https://cobolt-backend.onrender.com http://cobolt-backend.onrender.com http://localhost:5000 http://127.0.0.1:5000 https://res.cloudinary.com; img-src 'self' data: blob: https://placehold.co https://res.cloudinary.com https://cobolt-backend.onrender.com http://cobolt-backend.onrender.com http://localhost:5000 http://127.0.0.1:5000; media-src 'self' data: blob:; font-src 'self' data:;",
>>>>>>> ca192ae (admin portal)
          },
        ],
      },
    ];
  },
};

export default nextConfig;
