/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.ibb.co', 'www.google.com', 'i.pinimg.com', 'th.bing.com'],
    // Add your allowed external image domains here
  },
};

module.exports = nextConfig;
