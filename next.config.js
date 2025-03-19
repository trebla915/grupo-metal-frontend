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
  },
  // Use standalone output for better deployment
  output: 'standalone',
  // Ensure proper routing
  trailingSlash: false,
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
}

module.exports = nextConfig 