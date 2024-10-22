import React from "react";
import SerpLayout from "@/app/ui/SerpLayout";

type Props = {
  params: {
    slug: string[];
  };
};

const getData = async (slug: string[]) => {
  const constructedUrl = `/video/${slug.join("/")}`;

  const res = await fetch("http://139.99.61.232:8080/api/page/search/url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: constructedUrl }),
    next: { revalidate: 1 },
  });

  return res.json();
};

export default async function Tags({ params }: Props) {
  const data = await getData(params.slug);

  return (
    <SerpLayout
      searchResult={data.searchResult}
      seoData={data.seoData}
      searchPaging={data.searchPaging}
      linkboxes={data.linkboxes}
    />
  );
}
