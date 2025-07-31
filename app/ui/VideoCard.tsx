import React from "react";
import VideoCardImage from "./VideoCardImage";
import VideoCardHostContainer from "./VideoCardHostContainer";
import VideoCardClickableArea from "./VideoCardClickableArea";
import { HoverProvider } from "../context/HoverContext";
import Link from "next/link";
import localFont from "next/font/local";

const inter = localFont({
  src: "../fonts/inter.ttf",
  variable: "--font-inter",
});

type VideoCardProps = { video: Video; host: boolean };

export default function VideoCard({ video, host }: VideoCardProps) {
  const categories = video.categories.slice(0, 3);
  const tags = video.tags.slice(0, 2);
  const pornstars = video.pornstars.slice(0, 2);

  const height = host ? "h-48" : "h-40";

  return (
    <div
      className={`card card-compact bg-[#0d0d0b] border border-[#1f1e1d] relative cursor-pointer overflow-hidden hover:scale-[1.02] hover:border-[#fb7ec3]/50 transition-all duration-200 rounded-md ${inter.className}`}
    >
      <HoverProvider>
        <VideoCardClickableArea id={video.id} title={video.title} />
        <figure className={`${height} w-full overflow-hidden relative`}>
          <VideoCardImage pictures={video.pictures} />

          {video.new && (
            <span className="absolute top-2 right-2 bg-[#fb7ec3] text-black text-xs font-semibold px-2 py-1 rounded">
              New
            </span>
          )}

          {video.links && (
            <>
              {video.links.some((link) => link.resolution === 5) && (
                <span className="absolute bottom-2 left-2 bg-[#fb7ec3]/70 text-white text-xs font-semibold px-2 py-1 rounded">
                  4K
                </span>
              )}

              {video.links.some((link) => link.resolution >= 1) &&
                !video.links.some((link) => link.resolution === 5) && (
                  <span className="absolute bottom-2 left-2 bg-[#fb7ec3]/70 text-white text-xs font-semibold px-2 py-1 rounded">
                    HD
                  </span>
                )}
            </>
          )}

          {video.duration && (
            <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-semibold px-2 py-1 rounded">
              {video.duration}
            </span>
          )}
        </figure>
        <div className="card-body p-4">
          <h2
            className="card-title text-white overflow-hidden text-ellipsis text-base"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              height: "2.5rem",
              lineHeight: "1.25rem",
              textOverflow: "ellipsis",
            }}
          >
            {video.title}
          </h2>

          {host && (
            <div className="mt-3 flex flex-wrap gap-2 h-[48px] overflow-hidden">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  href={`/videos/categories/${category.value
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="badge bg-[#fb7ec3] text-black border-none hover:bg-[#e85a9d] transition-colors duration-200"
                >
                  {category.value
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </Link>
              ))}
              {tags.map((tag, index) => (
                <Link
                  key={index}
                  href={`/videos/tags/${tag.value
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="badge bg-[#fb7ec3] text-black border-none hover:bg-[#e85a9d] transition-colors duration-200"
                >
                  {tag.value
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </Link>
              ))}
              {pornstars.map((pornstar, index) => (
                <Link
                  key={index}
                  href={`/videos/pornstars/${pornstar.value
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="badge bg-[#2a2a28] text-gray-300 border border-[#1f1e1d] hover:bg-[#fb7ec3] hover:text-black transition-colors duration-200"
                >
                  {pornstar.value
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </Link>
              ))}
            </div>
          )}

          {host && (
            <div className="mt-3 pt-3 border-t border-[#1f1e1d]">
              <VideoCardHostContainer hostLinks={video.links} />
            </div>
          )}
        </div>
      </HoverProvider>
    </div>
  );
}
