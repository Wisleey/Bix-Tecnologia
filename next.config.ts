// next.config.ts
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    // ativa styled-components no SWC
    styledComponents: true,
  },
  reactStrictMode: true,
  // swcMinify é true por padrão em Next 15, mas você pode explicitar:
  swcMinify: true,
};

export default nextConfig;
