import React from "react";
import { cache } from "react";
import { Metadata } from "next";
import PornstarsClient from "./PornstarsClient";
import localFont from "next/font/local";

type PornstarLink = {
  count: number;
  linkText: string;
  order: number;
  recentCount: number;
  url: string;
};

type PornstarsData = {
  seoData: {
    title: string;
    description: string;
    headline: string;
    canonical: string;
    isIndexed: boolean;
    recentCount: number;
    keywords?: string[];
  };
  pageLinks: PornstarLink[];
  linkboxes: LinkBoxes;
};

const getData = cache(async (): Promise<PornstarsData> => {
  const res = await fetch("https://x-api.ovh/api/page/pornstars", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.PRIVATE_API_KEY}`,
    },
    next: { revalidate: 0 },
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

const inter = localFont({
  src: "../fonts/inter.ttf",
  variable: "--font-inter",
});

export default async function Pornstars() {
  const data = await getData();
  return <PornstarsClient data={data} inter={inter} />;
}
