import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["smartjson.lc"],
  devIndicators: {
    position: "bottom-right",
  },
};

export default nextConfig;
