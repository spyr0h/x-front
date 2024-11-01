import React from "react";
import VideoCardImage from "./VideoCardImage";
import VideoCardHostContainer from "./VideoCardHostContainer";
import VideoCardClickableArea from "./VideoCardClickableArea";
import { HoverProvider } from "../context/HoverContext";
import Link from "next/link";

type VideoCardProps = { video: Video };

export default function VideoCard({ video }: VideoCardProps) {
  const categories = video.categories.slice(0, 3);
  const tags = video.tags.slice(0, 2);
  const pornstars = video.pornstars.slice(0, 2);

  return (
    <div className="card card-compact bg-base-100 w-70 shadow-xl relative cursor-pointer">
      <HoverProvider>
        <VideoCardClickableArea id={video.id} title={video.title} />
        <figure className="h-48 w-full overflow-hidden relative">
          <VideoCardImage pictures={video.pictures} />

          {video.links && (
            <>
              {video.links.some((link) => link.resolution === 5) && (
                <span className="absolute bottom-2 left-2 bg-violet-600 text-white text-xs font-semibold px-2 py-1 rounded">
                  4K
                </span>
              )}

              {video.links.some((link) => link.resolution >= 1) &&
                !video.links.some((link) => link.resolution === 5) && (
                  <span className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                    HD
                  </span>
                )}
            </>
          )}

          {video.duration && (
            <span className="absolute bottom-2 right-2 bg-gray-800 text-white text-xs font-semibold px-2 py-1 rounded">
              {video.duration}
            </span>
          )}
        </figure>
        <div className="card-body">
          <h2
            className="card-title overflow-hidden text-ellipsis"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              height: "3rem",
              lineHeight: "1.5rem",
              textOverflow: "ellipsis",
            }}
          >
            {video.title}
          </h2>

          <div className="mt-2 flex flex-wrap min-h-[48px] z-20">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={`/videos/categories/${category.value
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="badge badge-primary badge-outline mr-1 mb-1 cursor-pointer"
              >
                {category.value}
              </Link>
            ))}
            {tags.map((tag, index) => (
              <Link
                key={index}
                href={`/videos/tags/${tag.value
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="badge badge-secondary badge-outline mr-1 mb-1 cursor-pointer"
              >
                {tag.value}
              </Link>
            ))}
            {pornstars.map((pornstar, index) => (
              <Link
                key={index}
                href={`/videos/pornstars/${pornstar.value
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="badge badge-accent badge-outline mr-1 mb-1 cursor-pointer"
              >
                {pornstar.value}
              </Link>
            ))}
          </div>

          <VideoCardHostContainer hostLinks={video.links} />
        </div>
      </HoverProvider>
    </div>
  );
}
