import React from "react";
import NotFoundLayout from "@/app/ui/NotFoundLayout";

const getData = async () => {
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
};

export default async function NotFound() {
  const data = await getData();
  return <NotFoundLayout linkboxes={data.linkboxes} />;
}
