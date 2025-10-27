/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wir-in-ungarn.hu",
        port: "",
        pathname: "/wiucontent/themes/grimag-child-theme/assets/images/**",
      },
      {
        protocol: "https",
        hostname: "wir-in-ungarn.hu",
        port: "",
        pathname: "/wiucontent/uploads/**", // ✅ Added this line
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
};

export default nextConfig;
