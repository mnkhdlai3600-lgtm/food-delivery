import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ol9s3tbepydwhktg.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/redirectRoute",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
