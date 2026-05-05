/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      // All stores — wildcard approach for OG images from any store domain
      { protocol: 'https', hostname: '**' },
    ],
  },
};

export default nextConfig;
