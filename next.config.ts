import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Dashboard and Projects were merged into one Sites home.
      { source: "/projects", destination: "/dashboard", permanent: false },
      // The templates page only ever showed placeholder content.
      { source: "/templates", destination: "/dashboard", permanent: false },
    ];
  },
};

export default nextConfig;
