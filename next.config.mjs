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

  // Add this to ignore TypeScript errors on build
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
};

export default withPlaiceholder(nextConfig);
