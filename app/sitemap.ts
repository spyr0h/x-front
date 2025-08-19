import type { MetadataRoute } from "next";

export const revalidate = 86400; // regenerate sitemap daily

const BASE_URL = "https://kinkorner.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: new Date() },
    { url: `${BASE_URL}/categories`, lastModified: new Date() },
    { url: `${BASE_URL}/pornstars`, lastModified: new Date() },
  ];

  try {
    const [categoriesRes, pornstarsRes] = await Promise.all([
      fetch("https://x-api.ovh/api/page/categories", {
        method: "GET",
        headers: { Authorization: `Bearer ${process.env.PRIVATE_API_KEY}` },
        next: { revalidate: 86400 },
      }),
      fetch("https://x-api.ovh/api/page/pornstars", {
        method: "GET",
        headers: { Authorization: `Bearer ${process.env.PRIVATE_API_KEY}` },
        next: { revalidate: 86400 },
      }),
    ]);

    if (categoriesRes.ok) {
      const categoriesData = await categoriesRes.json();
      if (categoriesData?.pageLinks?.length) {
        for (const link of categoriesData.pageLinks as Array<{ url: string }>) {
          try {
            const url = new URL(`${BASE_URL}${link.url}`);
            url.searchParams.delete("page");
            entries.push({ url: url.toString(), lastModified: new Date() });
          } catch {}
        }
      }
    }

    if (pornstarsRes.ok) {
      const pornstarsData = await pornstarsRes.json();
      if (pornstarsData?.pageLinks?.length) {
        for (const link of pornstarsData.pageLinks as Array<{ url: string }>) {
          try {
            const url = new URL(`${BASE_URL}${link.url}`);
            url.searchParams.delete("page");
            entries.push({ url: url.toString(), lastModified: new Date() });
          } catch {}
        }
      }
    }
  } catch (error) {
    console.error("Failed to build sitemap:", error);
  }

  return entries;
}
