import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // 이미지 업로드 허용
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dnmpbccnnonqggtdmegr.supabase.co",
      },
    ],
  },
};

export default nextConfig;
