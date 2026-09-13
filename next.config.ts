import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [{ source: "/post/:slug", destination: "/journal/:slug", permanent: true }];
  },
};

export default nextConfig;
