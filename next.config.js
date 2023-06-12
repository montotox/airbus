/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["ciclofargate-staticsfilesbucket-11a3qmi5fai9p.s3.amazonaws.com"],
  },
};

module.exports = nextConfig;
