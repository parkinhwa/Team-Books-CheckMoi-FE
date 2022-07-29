/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;

module.exports = {
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
  images: {
    domains: ["i.picsum.photos"],
  },
};
