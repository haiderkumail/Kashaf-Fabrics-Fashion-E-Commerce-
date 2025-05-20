import withPlaiceholder from '@plaiceholder/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'res.cloudinary.com',
      'i.pinimg.com',
      'images.unsplash.com',
      'cdn.pixabay.com',
      'www.pinterest.com',
      'drive.google.com',
    ],
  },

  // ✅ Skip ESLint during build (useful for Vercel deploys)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ Skip TypeScript errors during build (only if you're sure)
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withPlaiceholder(nextConfig);
