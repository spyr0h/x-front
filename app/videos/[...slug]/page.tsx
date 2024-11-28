import React from "react";
import { cache } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import SerpLayout from "@/app/ui/SerpLayout";

type Props = {
  params: {
    slug: string[];
  };
  searchParams: { terms?: string; page?: number };
};

const getData = cache(async (slug: string) => {
  const constructedUrl = `${slug}`;

  const res = await fetch("http://139.99.61.232:8080/api/page/search/url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.PRIVATE_API_KEY}`,
    },
    body: JSON.stringify({ url: constructedUrl }),
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    notFound();
  }

  return res.json();
});

const generateUrl = ({ params, searchParams }: Props): string => {
  if (searchParams.terms === undefined) {
    return `/videos/${params.slug.join("/")}`;
  }

  const technicalUrl = `/videos/search?terms=${searchParams.terms.replace(
    " ",
    "+"
  )}`;

  if (searchParams.page !== undefined) {
    return `${technicalUrl}&page=${searchParams.page}`;
  }

  return technicalUrl;
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const url = generateUrl({ params, searchParams });

  const data = await getData(`${url}`);

  return {
    title: data.seoData.title,
    description: data.seoData.description,
  };
}

export default async function Videos({ params, searchParams }: Props) {
  const url = generateUrl({ params, searchParams });

  const data = await getData(url);

  return (
    <SerpLayout
      searchResult={data.searchResult}
      seoData={data.seoData}
      searchPaging={data.searchPaging}
      linkboxes={data.linkboxes}
    />
  );
}
