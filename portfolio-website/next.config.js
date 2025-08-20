/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Explicitly set server configuration
  server: {
    port: 8080,
    host: 'localhost'
  },
};

module.exports = nextConfig;