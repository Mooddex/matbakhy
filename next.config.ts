import type { NextConfig } from "next";


const nextConfig :NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        // Optional: you can restrict specific paths with pathname
        // pathname: '/path/to/images/**', 
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        // Use '**' to allow any path under the hostname
       
      },
       {
        protocol: 'https',
        hostname: 'placecats.com',
        // Use '**' to allow any path under the hostname
       
      },
       {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**', // Allows any path on this domain
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
