import React from "react";
import { cache } from "react";
import Link from "next/link";
import { Metadata } from "next";
import Header from "@/app/ui/Header";
import Footer from "@/app/ui/Footer";
import VideoDetailImage from "@/app/ui/VideoDetailImage";
import DownloadCard from "@/app/ui/DownloadCard";
import SuggestionContainer from "@/app/ui/SuggestionContainer";
import { groupHostLinks } from "@/app/utils/helpers";
import localFont from "next/font/local";

const inter = localFont({
  src: "../../fonts/inter.ttf",
  variable: "--font-inter",
});

type Props = {
  params: {
    slug: string[];
  };
};

const getData = cache(async (slug: string) => {
  const constructedUrl = `/video/${slug}`;

  const res = await fetch("https://x-api.ovh/api/page/detail/url", {
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getData(`/video/${params.slug.join("/")}`);
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

export default async function Video({ params }: Props) {
  const data = await getData(`/video/${params.slug.join("/")}`);

  const foundKeepTwoShareLink = data.video.links.find(
    (link: HostLink) => link.host === 7
  );

  let preview = "";

  if (foundKeepTwoShareLink) {
    const link = foundKeepTwoShareLink.url;
    const splitted = link.split("/");
    if (splitted[3] === "file")
      preview = `https://k2s.cc/preview/${splitted[4]}"`;
    else preview = `https://k2s.cc/preview/${link.split("/").pop()}"`;
  }

  const groupedLinks = groupHostLinks(data.video.links);
  const hasDetails = data.video.duration || data.video.year;
  const hasDescription =
    data.video.description && data.video.description.trim();
  const hasPreviews = data.video.pictures && data.video.pictures.length > 0;

  return (
    <div className="min-h-screen flex flex-col bg-[#050504]">
      <Header linkboxes={data.linkboxes} />
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Title */}
            <h1
              className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-white ${inter.className}`}
            >
              {data.seoData.headline}
            </h1>

            {/* Video Preview */}
            {preview && (
              <div className="mb-8">
                <iframe
                  src={preview}
                  allowFullScreen={true}
                  className="w-full aspect-video rounded-lg"
                />
              </div>
            )}

            {/* Tags */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {data.video.categories.map(
                  (category: Category, index: number) => (
                    <Link
                      key={index}
                      href={`/videos/categories/${category.value
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className={`badge bg-[#fb7ec3] text-black border-none hover:bg-[#e85a9d] transition-colors duration-200 ${inter.className}`}
                    >
                      {category.value
                        .split(" ")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </Link>
                  )
                )}
                {data.video.tags.map((tag: Tag, index: number) => (
                  <Link
                    key={index}
                    href={`/videos/tags/${tag.value
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className={`badge bg-[#fb7ec3] text-black border-none hover:bg-[#e85a9d] transition-colors duration-200 ${inter.className}`}
                  >
                    {tag.value
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </Link>
                ))}
                {data.video.pornstars.map(
                  (pornstar: Pornstar, index: number) => (
                    <Link
                      key={index}
                      href={`/videos/pornstars/${pornstar.value
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className={`badge bg-[#0d0d0b] text-gray-300 border border-[#1f1e1d] hover:bg-[#fb7ec3] hover:text-black transition-colors duration-200 ${inter.className}`}
                    >
                      {pornstar.value
                        .split(" ")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </Link>
                  )
                )}
              </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-8 mb-8">
              {/* Description & Details Combined */}
              {(hasDescription || hasDetails) && (
                <div className="bg-[#0d0d0b] border border-[#1f1e1d] rounded-lg p-6">
                  <h2
                    className={`text-lg font-semibold mb-4 text-white ${inter.className}`}
                  >
                    Details
                  </h2>
                  {hasDescription && (
                    <div
                      className={`text-white ${inter.className} ${
                        hasDetails ? "mb-6" : ""
                      }`}
                      dangerouslySetInnerHTML={{
                        __html: data.video.description,
                      }}
                    />
                  )}

                  {hasDetails && (
                    <div
                      className={`${
                        hasDescription ? "pt-4 border-t border-[#1f1e1d]" : ""
                      } ${inter.className}`}
                    >
                      <div className="flex flex-wrap gap-4 text-gray-300">
                        {data.video.duration && (
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Duration:</span>
                            <span>{data.video.duration}</span>
                          </div>
                        )}
                        {data.video.year && (
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Year:</span>
                            <span>{data.video.year}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Download Section */}
              <div className="bg-[#0d0d0b] border border-[#1f1e1d] rounded-lg p-6">
                <h2
                  className={`text-lg font-semibold mb-4 text-white ${inter.className}`}
                >
                  Download
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {Object.entries(groupedLinks).flatMap(([key, hostLinks]) =>
                    hostLinks.map((hostLink, index) => (
                      <DownloadCard
                        key={`${key}-${index}`}
                        hostKey={key}
                        hostLink={hostLink}
                        inter={inter}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Previews */}
            {hasPreviews && (
              <div className="mb-8">
                <div className="bg-[#0d0d0b] border border-[#1f1e1d] rounded-lg p-6">
                  <h2
                    className={`text-lg font-semibold mb-6 text-white ${inter.className}`}
                  >
                    Previews
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {data.video.pictures.map(
                      (picture: Picture, index: number) => (
                        <VideoDetailImage
                          key={index}
                          index={index}
                          picture={picture}
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Suggestions */}
            <div className="mt-12 mb-8">
              <div className="bg-[#0d0d0b] border border-[#1f1e1d] rounded-lg p-6 pb-8">
                <h2
                  className={`text-lg font-semibold mb-6 text-white ${inter.className}`}
                >
                  You may like...
                </h2>
                <SuggestionContainer
                  suggestionBoxes={data.suggestionBoxes}
                  disableHover={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
