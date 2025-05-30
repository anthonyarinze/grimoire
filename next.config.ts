import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "books.google.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "books.google.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "covers.openlibrary.org",
        port: "",
        pathname: "/**",
      },
    ],
  },

  webpack: (config, { isServer }) => {
    // Prevent canvas and encoding modules from resolving on server
    config.resolve = {
      ...config.resolve,
      alias: {
        ...(config.resolve.alias || {}),
        canvas: false,
        encoding: false,
      },
    };

    return config;
  },
};

export default nextConfig;
