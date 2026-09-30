/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tree-shakes framer-motion imports -> smaller JS bundle
  experimental: { optimizePackageImports: ["framer-motion"] },
  poweredByHeader: false,
};
export default nextConfig;
