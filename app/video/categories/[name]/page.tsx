import React from "react";
import VideoCard from "@/app/ui/VideoCard";
import Header from "@/app/ui/Header";
import Paging from "@/app/ui/Paging";

type Props = {
  params: {
    name: string;
  };
};

const getData = async (name: string) => {
  const constructedUrl = `/video/categories/${name}`;

  console.error(constructedUrl);

  const res = await fetch("http://139.99.61.232:8080/api/page/search/url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: constructedUrl }),
    next: { revalidate: 300 },
  });

  return res.json();
};

export default async function Categories({ params }: Props) {
  const data = await getData(params.name);

  const videos = data.searchResult.videos;

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
          {data.seoData.headline}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video: Video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
      <Paging paging={data.searchPaging} />
    </div>
  );
}
