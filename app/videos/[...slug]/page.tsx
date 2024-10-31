import React from "react";
import { cache } from "react";
import { Metadata } from "next";
import SerpLayout from "@/app/ui/SerpLayout";

type Props = {
  params: {
    slug: string[];
  };
};

const getData = cache(async (slug: string) => {
  const constructedUrl = `/video/${slug}`;

  const res = await fetch("http://139.99.61.232:8080/api/page/search/url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: constructedUrl }),
    next: { revalidate: 1 },
  });

  return res.json();
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getData(`/video/${params.slug.join("/")}`);
  return {
    title: data.seoData.title,
    description: data.seoData.description,
  };
}

export default async function Videos({ params }: Props) {
  const data = await getData(`/video/${params.slug.join("/")}`);

  return (
    <SerpLayout
      searchResult={data.searchResult}
      seoData={data.seoData}
      searchPaging={data.searchPaging}
      linkboxes={data.linkboxes}
    />
  );
}
