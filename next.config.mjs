// @ts-check
import withPlaiceholder from '@plaiceholder/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'res.cloudinary.com',
      'i.pinimg.com', // Pinterest image domain
      'images.unsplash.com',
      'cdn.pixabay.com',
      'www.pinterest.com', // Optional for Pinterest URLs with 'www' prefix
      'drive.google.com', // Allow Google Drive image links
    ],
  },
};

export default withPlaiceholder(nextConfig);
