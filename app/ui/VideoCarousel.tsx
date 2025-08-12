"use client";

import { useRef } from "react";
import VideoCard from "./VideoCard";

type CarouselProps = {
  videos: Video[];
  disableHover?: boolean;
};

export default function VideoCarousel({
  videos,
  disableHover = false,
}: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth / 1.5;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full">
      <div
        ref={carouselRef}
        className="flex w-full overflow-x-auto scrollbar-hide scroll-smooth space-x-4"
      >
        {videos.map((video) => (
          <div key={video.id} className="relative w-80 flex-shrink-0">
            <VideoCard video={video} host={false} disableHover={disableHover} />
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full z-20 hidden sm:block"
      >
        &#9664;
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full z-20 hidden sm:block"
      >
        &#9654;
      </button>
    </div>
  );
}
