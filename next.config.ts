import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  ...(isGithubActions
    ? {
        output: "export",
        basePath: "/portfolio",
      }
    : {
        async rewrites() {
          return [
            {
              source: "/portfolio",
              destination: "/",
            },
            {
              source: "/portfolio/:path*",
              destination: "/:path*",
            },
          ];
        },
      }),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
