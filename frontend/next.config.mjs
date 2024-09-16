/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "at-once.info",
        port: "",
      },
      {
        protocol: "https",
        hostname: "api-speedmove.at-once.info",
        port: "",
      },
      {
        protocol: "https",
        hostname: "api.xn--12cbgmf3hf0eafgd0k0bkj2g0h9fna.net",
        port: "",
      },
      {
        protocol: "https",
        hostname: "api.รับขนย้ายเครื่องจักร.net",
        port: "",
      },
      {
        protocol: "http",
        hostname: "192.168.0.113",
        port: "3000",
      },
    ],
  },
};

export default nextConfig;
