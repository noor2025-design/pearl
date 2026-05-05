/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // All stores — wildcard approach for OG images from any store domain
      { protocol: 'https', hostname: '**' },
    ],
  },
};

export default nextConfig;
