import type { MetadataRoute } from "next";

const BASE_URL = "https://kinkorner.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/categories",
          "/pornstars",
          "/videos/categories/*/*$",
          "/videos/pornstars/*/*$",
        ],
        disallow: [
          "/video/", // block all video detail pages
          "/*?*", // block any URL with query params
          "/videos/*/*/*", // block pagination like /2, /3 appended
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
