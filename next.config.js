/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    strictNullChecks: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    // Optimizations for serverless
  },
}

export default nextConfig
