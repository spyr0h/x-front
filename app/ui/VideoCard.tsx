import React from "react";
import Link from "next/link";
import VideoCardImage from "./VideoCardImage";

type VideoCardProps = {
  video: Video;
};

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-1 h-96 flex flex-col cursor-pointer">
      <div className="flex-shrink-0 h-1/2 overflow-hidden relative">
        <VideoCardImage pictures={video.pictures} />

        {video.duration && (
          <div className="absolute bottom-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
            {video.duration}
          </div>
        )}
      </div>
      <div className="px-6 py-2 flex-1 flex flex-col">
        <h2 className="text-black font-bold text-xl mb-1 overflow-hidden overflow-ellipsis line-clamp-2">
          {video.title}
        </h2>

        <p className="text-gray-700 text-base flex-1 overflow-hidden overflow-ellipsis whitespace-nowrap mb-1">
          {video.description?.trim()}
        </p>

        <div className="flex flex-wrap mt-1">
          {video.tags.slice(0, 3).map((tag) => (
            <Link
              key={tag.id}
              href={`/video/tags/${tag.value
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
            >
              <span className="inline-block bg-blue-200 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full mr-2 mb-1 cursor-pointer">
                {tag.value}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
