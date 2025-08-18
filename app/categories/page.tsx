import React from "react";
import { cache } from "react";
import { Metadata } from "next";
import CategoriesClient from "./CategoriesClient";
import localFont from "next/font/local";

const inter = localFont({
  src: "../fonts/inter.ttf",
  variable: "--font-inter",
});

type CategoryLink = {
  count: number;
  linkText: string;
  order: number;
  recentCount: number;
  url: string;
};

type LinkBox = {
  category: number;
  links: CategoryLink[];
  order: number;
  title: string;
};

type CategoriesData = {
  linkboxes: {
    linkboxes: LinkBox[];
  };
  pageLinks: CategoryLink[];
  seoData: {
    canonical: string;
    description: string;
    headline: string;
    isIndexed: boolean;
    recentCount: number;
    title: string;
    keywords?: string[];
  };
};

const getData = cache(async (): Promise<CategoriesData> => {
  const res = await fetch("https://x-api.ovh/api/page/categories", {
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

export default async function Categories() {
  const data = await getData();

  return <CategoriesClient data={data} inter={inter} />;
}
