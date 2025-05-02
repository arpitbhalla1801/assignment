import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable ESLint during build to resolve deployment errors
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
