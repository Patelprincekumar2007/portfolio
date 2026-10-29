import type { NextConfig } from "next";

// Custom domain patelprince.xyz is served at the domain root.
// If an environment variable BASE_PATH is provided (e.g. for subpath testing), use it;
// otherwise default to "" (root domain).
const basePath = process.env.BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

