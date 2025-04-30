import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
  images: {
    domains: [
    "oaidalleapiprodscus.blob.core.windows.net",
    ]
    }
};

export default nextConfig;
