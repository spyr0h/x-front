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

  const res = await fetch("https://x-api.ovh/api/page/search/url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.PRIVATE_API_KEY}`,
    },
    body: JSON.stringify({ url: constructedUrl }),
    next: { revalidate: 86400 },
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

export async function generateStaticParams() {
  const staticParams: { slug: string[] }[] = [];

  try {
    if (!process.env.PRIVATE_API_KEY) {
      console.error("PRIVATE_API_KEY is not defined");
      return [];
    }

    const categoriesRes = await fetch("https://x-api.ovh/api/page/categories", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.PRIVATE_API_KEY}`,
      },
    });

    if (categoriesRes.ok) {
      const text = await categoriesRes.text();
      try {
        const categoriesData = JSON.parse(text);
        if (
          categoriesData.pageLinks &&
          Array.isArray(categoriesData.pageLinks)
        ) {
          for (const category of categoriesData.pageLinks) {
            const urlParts = category.url.split("/").filter(Boolean);
            if (urlParts.length >= 2) {
              staticParams.push({ slug: urlParts.slice(1) });
            }
          }
        }
      } catch (parseError) {
        console.error(
          "Failed to parse categories JSON:",
          parseError,
          text.substring(0, 200)
        );
      }
    } else {
      console.error(
        `Categories API error: ${categoriesRes.status} ${categoriesRes.statusText}`
      );
    }

    const pornstarsRes = await fetch("https://x-api.ovh/api/page/pornstars", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.PRIVATE_API_KEY}`,
      },
    });

    if (pornstarsRes.ok) {
      const text = await pornstarsRes.text();
      try {
        const pornstarsData = JSON.parse(text);
        if (pornstarsData.pageLinks && Array.isArray(pornstarsData.pageLinks)) {
          for (const pornstar of pornstarsData.pageLinks) {
            const urlParts = pornstar.url.split("/").filter(Boolean);
            if (urlParts.length >= 2) {
              staticParams.push({ slug: urlParts.slice(1) });
            }
          }
        }
      } catch (parseError) {
        console.error(
          "Failed to parse pornstars JSON:",
          parseError,
          text.substring(0, 200)
        );
      }
    } else {
      console.error(
        `Pornstars API error: ${pornstarsRes.status} ${pornstarsRes.statusText}`
      );
    }

    console.log(`Generated ${staticParams.length} static params for SSG`);
    return staticParams;
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const url = generateUrl({ params, searchParams });

  const data = await getData(`${url}`);

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
