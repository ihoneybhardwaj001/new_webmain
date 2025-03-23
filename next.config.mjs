/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "source.unsplash.com",
      "images.unsplash.com",
      "ext.same-assets.com",
      "ugc.same-assets.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ext.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ugc.same-assets.com",
        pathname: "/**",
      },
    ],
    deviceSizes: [320, 420, 768, 1024, 1200], // ✅ Required for responsive images
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // ✅ Small image sizes
  },
  experimental: {
    images: { allowFutureImage: true }, // Optional but may help
  },
};

export default nextConfig;
