import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["smartjson.lc"],
  devIndicators: {
    position: "bottom-right",
  },

  // Настройки для HMR через прокси
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;
