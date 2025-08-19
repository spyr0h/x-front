import React from "react";
import { cache } from "react";
import { Metadata } from "next";
import SerpLayout from "@/app/ui/SerpLayout";

export const dynamic = "force-static";
export const revalidate = 86400; // ISR: revalidate daily

const getData = cache(async () => {
  const constructedUrl = `/videos/all`;

  const res = await fetch("https://x-api.ovh/api/page/search/url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.PRIVATE_API_KEY}`,
    },
    body: JSON.stringify({ url: constructedUrl }),
    next: { revalidate: 86400 },
  });

  return res.json();
});

export async function generateMetadata(): Promise<Metadata> {
  const data = await getData();

  return {
    title: data.seoData.title,
    description: data.seoData.description,
    keywords: data.seoData.keywords?.join(", "),
    robots: data.seoData.isIndexed ? "index, follow" : "noindex, nofollow",
    alternates: {
      canonical: `https://kinkorner.com${data.seoData.canonical}`,
    },
  };
}

export default async function Categories() {
  const data = await getData();

  return (
    <div>
      <SerpLayout
        searchResult={data.searchResult}
        seoData={data.seoData}
        searchPaging={data.searchPaging}
        linkboxes={data.linkboxes}
      />
    </div>
  );
}
