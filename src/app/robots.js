/**
 * robots.js - Next.js robots.txt generator
 * This file generates a dynamic robots.txt for the site
 */
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/auth/", "/profile/", "/reset-password/"],
      },
    ],
    sitemap: "https://wir-in-ungarn.hu/sitemap.xml",
  };
}
