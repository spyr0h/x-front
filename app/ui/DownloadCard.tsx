"use client";

import React from "react";
import VideoCardHostButton from "./VideoCardHostButton";
import {
  getResolutionText,
  getFormatText,
  formatSize,
} from "@/app/utils/downloadUtils";

type HostLink = {
  url: string;
  size: number;
  host: number;
  resolution: number;
  format: number;
  part: number;
};

type DownloadCardProps = {
  hostKey: string;
  hostLinks: HostLink[];
  hostLink: HostLink;
  inter: any;
};

export default function DownloadCard({
  hostKey,
  hostLinks,
  hostLink,
  inter,
}: DownloadCardProps) {
  const handleCardClick = () => {
    // Only handle click on mobile/small screens
    if (window.innerWidth < 640) {
      window.open(hostLink.url, "_blank");
    }
  };

  return (
    <div
      className="bg-[#0d0d0b] rounded-md p-3 border border-[#1f1e1d] flex sm:flex-col cursor-pointer sm:cursor-default"
      onClick={handleCardClick}
    >
      <div className="flex-1 min-w-0">
        <div className={`text-white font-medium text-sm ${inter.className}`}>
          <span className="text-[#fb7ec3]">
            {getResolutionText(hostLink.resolution)}
          </span>
          {getResolutionText(hostLink.resolution) && " - "}
          {getFormatText(hostLink.format)}
        </div>
        <div className={`text-gray-400 text-xs mt-1 ${inter.className}`}>
          {formatSize(hostLink.size)}
        </div>
      </div>
      <div className="ml-3 sm:ml-0 sm:mt-3 flex-shrink-0 w-24 sm:w-auto h-full sm:h-auto">
        <VideoCardHostButton
          key={hostKey}
          hostKey={hostKey}
          hostLinks={[hostLink]}
        />
      </div>
    </div>
  );
}
