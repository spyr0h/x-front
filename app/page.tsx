import React from "react";
import { cache } from "react";
import { Metadata } from "next";
import Head from "next/head";
import SerpLayout from "@/app/ui/SerpLayout";

const getData = cache(async () => {
  const constructedUrl = `/videos/all`;

  const res = await fetch("http://139.99.61.232:8080/api/page/search/url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.PRIVATE_API_KEY}`,
    },
    body: JSON.stringify({ url: constructedUrl }),
    next: { revalidate: 0 },
  });

  return res.json();
});

export async function generateMetadata(): Promise<Metadata> {
  const data = await getData();
  return {
    title: data.seoData.title,
    description: data.seoData.description,
  };
}

export default async function Categories() {
  const data = await getData();

  return (
    <div>
      <Head>
        <title>cacahouete</title>
        <meta name="description" content="caca" />
      </Head>
      <SerpLayout
        searchResult={data.searchResult}
        seoData={data.seoData}
        searchPaging={data.searchPaging}
        linkboxes={data.linkboxes}
      />
    </div>
  );
}
