/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['i.ibb.co','www.google.com','i.pinimg.com','th.bing.com'],
        // Add your allowed external image domains here
      },
        domains: ['www.google.com', 'i.ibb.co'],
    },
}

module.exports = nextConfig
