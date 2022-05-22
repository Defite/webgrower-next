/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["a.storyblok.com"],
  },
  compiler: {
    removeConsole: true,
  },
};

module.exports = nextConfig;
