import React from "react";
import { cache } from "react";
import Link from "next/link";
import { Metadata } from "next";
import Header from "@/app/ui/Header";
import Footer from "@/app/ui/Footer";
import VideoDetailImage from "@/app/ui/VideoDetailImage";
import VideoDetailDescription from "@/app/ui/VideoDetailDescription";
import VideoCardHostButton from "@/app/ui/VideoCardHostButton";
import SuggestionContainer from "@/app/ui/SuggestionContainer";
import { groupHostLinks } from "@/app/utils/helpers";

const resolutionMap = ["SD", "HD", "FHD", "QHD", "2K", "4K", "8K"];
const formatMap = ["mp4", "rar", "avi"];

const getResolutionText = (resolution: number | undefined): string => {
  return resolution !== undefined &&
    resolution >= 0 &&
    resolution < resolutionMap.length
    ? resolutionMap[resolution]
    : "";
};

const getFormatText = (format: number | undefined): string => {
  return format !== undefined && format >= 0 && format < formatMap.length
    ? formatMap[format]
    : "";
};

const formatSize = (size: number): string => {
  return size >= 1000 ? `${(size / 1000).toFixed(2)} GB` : `${size} MB`;
};

type Props = {
  params: {
    slug: string[];
  };
};

const getData = cache(async (slug: string) => {
  const constructedUrl = `/video/${slug}`;

  const res = await fetch("http://139.99.61.232:8080/api/page/detail/url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: constructedUrl }),
    next: { revalidate: 0 },
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

export default async function Video({ params }: Props) {
  const data = await getData(`/video/${params.slug.join("/")}`);

  console.error(data.suggestionBoxes[0]);

  const foundKeepTwoShareLink = data.video.links.find(
    (link: HostLink) => link.host === 7
  );

  let preview = "";

  if (foundKeepTwoShareLink) {
    const link = foundKeepTwoShareLink.url;
    preview = `https://k2s.cc/preview/${link.split("/").pop()}"`;
  }

  const groupedLinks = groupHostLinks(data.video.links);

  return (
    <div className="min-h-screen flex flex-col">
      <Header linkboxes={data.linkboxes} />
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="container w-2/4">
            <h1 className="text-3xl font-bold mb-8 text-left">
              {data.seoData.headline}
            </h1>
            <iframe
              src={preview}
              allowFullScreen={true}
              className="w-full aspect-video"
            />
            <div className="mt-5 flex flex-wrap z-20">
              {data.video.categories.map(
                (category: Category, index: number) => (
                  <Link
                    key={index}
                    href={`/videos/categories/${category.value
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="badge badge-lg badge-primary badge-outline mr-1 mb-1 cursor-pointer"
                  >
                    {category.value}
                  </Link>
                )
              )}
              {data.video.tags.map((tag: Tag, index: number) => (
                <Link
                  key={index}
                  href={`/videos/tags/${tag.value
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="badge badge-lg badge-secondary badge-outline mr-1 mb-1 cursor-pointer"
                >
                  {tag.value}
                </Link>
              ))}
              {data.video.pornstars.map((pornstar: Pornstar, index: number) => (
                <Link
                  key={index}
                  href={`/videos/pornstars/${pornstar.value
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="badge badge-lg badge-accent badge-outline mr-1 mb-1 cursor-pointer"
                >
                  {pornstar.value}
                </Link>
              ))}
            </div>
            <VideoDetailDescription description={data.video.description} />
            <div>
              {(data.video.duration || data.video.year) && (
                <div>
                  <h2 className="text-xl font-semibold mt-5 mb-2">Details</h2>
                  <ul className="text-gray-600">
                    {data.video.duration && (
                      <li>
                        <strong>Durée :</strong> {data.video.duration}
                      </li>
                    )}
                    {data.video.year && (
                      <li>
                        <strong>Année :</strong> {data.video.year}
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
            <h2 className="text-xl font-semibold mt-5 mb-2">Previews</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {data.video.pictures.map((picture: Picture, index: number) => (
                <VideoDetailImage key={index} index={index} picture={picture} />
              ))}
            </div>
            <h2 className="text-xl font-semibold mt-5 mb-2">Download</h2>
            <div className="bg-gray-600 rounded-lg p-4">
              {Object.entries(groupedLinks).flatMap(([key, hostLinks]) =>
                hostLinks.map((hostLink, index) => (
                  <li
                    key={`${key}-${index}`}
                    className="flex items-center justify-between py-2 border-b last:border-b-0"
                  >
                    <div className="flex-1" style={{ flex: "0 0 40%" }}>
                      <span className="font-semibold">
                        {getResolutionText(hostLink.resolution)}{" "}
                      </span>{" "}
                      - {getFormatText(hostLink.format)}{" "}
                    </div>
                    <div className="flex-1" style={{ flex: "0 0 40%" }}>
                      {formatSize(hostLink.size)}
                    </div>
                    <div className="flex-1" style={{ flex: "0 0 20%" }}>
                      <VideoCardHostButton
                        key={key}
                        hostKey={key}
                        hostLinks={[hostLink]}
                      />
                    </div>
                  </li>
                ))
              )}
            </div>
            <h2 className="text-xl font-semibold mt-5 mb-2">You may like...</h2>
            <SuggestionContainer suggestionBoxes={data.suggestionBoxes} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
