import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/ohhoney",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
