/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY
  },
};

module.exports = nextConfig;
