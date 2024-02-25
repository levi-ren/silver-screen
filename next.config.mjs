/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
};

export default nextConfig;
