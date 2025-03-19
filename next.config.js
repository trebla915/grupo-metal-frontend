/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable image optimization for backend domain
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'grupo-metal-backend.onrender.com',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true, // Add this for Vercel deployment
  },
  // Use standalone output for better deployment
  output: 'standalone',
  // Ensure proper routing
  trailingSlash: false,
  // Enable static page generation
  reactStrictMode: true,
  swcMinify: true,
  // Ignore backend directory during build
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  // Add basePath if needed
  basePath: '',
  // Add assetPrefix if needed
  assetPrefix: '',
  // Add this for Vercel deployment
  poweredByHeader: false,
  compress: true,
}

module.exports = nextConfig 