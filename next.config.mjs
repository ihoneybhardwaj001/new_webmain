/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Disables Next.js image optimization (useful for external images)
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
    sizes: [320, 420, 768, 1024, 1200], // ✅ Add valid sizes to prevent errors
  },
};

export default nextConfig;
