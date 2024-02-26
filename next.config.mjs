/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: "flagcdn.com",
      },
      {
        hostname: "tmdb.org",
      },
      {
        hostname: "themoviedb.org",
      },
      {
        hostname: "image.tmdb.org",
      },
    ],
  },
  devIndicators: {
    buildActivityPosition: "bottom-left",
    buildActivity: true,
  },
  experimental: {
    webVitalsAttribution: ["CLS", "LCP"],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
