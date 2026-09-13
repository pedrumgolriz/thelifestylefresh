import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      { source: "/post/:slug", destination: "/journal/:slug", permanent: true },
      { source: "/the-box", destination: "/envelope", permanent: true },
      { source: "/about", destination: "/house", permanent: true },
    ];
  },
};

export default nextConfig;
