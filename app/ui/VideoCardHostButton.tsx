"use client";

import React from "react";

type HostLink = {
  url: string;
  size: number;
  host: number;
  resolution: number;
  format: number;
  part: number;
};

type VideoCardHostButtonProps = {
  hostKey: string;
  hostLinks: HostLink[];
};

enum Host {
  DEPOSITFILECOM,
  DEPOSITFILEORG,
  DEPOSITFILESHORT,
  RAPIDGATOR,
  RAPIDGATORSHORT,
  K2S,
  K2SSHORT,
  K2SSHORTER,
  FILEBOOM,
  FILEBOOMSHORT,
  FILEFACTORY,
  FILEJOKER,
  FILEFOX,
  TEZFILES,
  FILESPACE,
  ONEFICHIER,
  MOVED,
}

const getImageForGroup = (key: number | string): string => {
  const imageForGroup: { [key: number | string]: string } = {
    [Host.DEPOSITFILECOM]: "/images/depositfiles.png",
    [Host.RAPIDGATOR]: "/images/rapidgator.png",
    [Host.K2S]: "/images/k2s.png",
    [Host.FILEBOOM]: "/images/fileboom.png",
    [Host.FILEFACTORY]: "/images/filefactory.png",
    [Host.FILEFOX]: "/images/filefox.png",
    [Host.FILEJOKER]: "/images/filejoker.png",
    [Host.FILESPACE]: "/images/filespace.png",
    [Host.TEZFILES]: "/images/tezfile.png",
    [Host.ONEFICHIER]: "/images/onefichier.png",
  };
  return imageForGroup[key];
};

export default function VideoCardHostButton({
  hostKey,
  hostLinks,
}: VideoCardHostButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    // Prevent click on mobile (handled by parent card)
    if (window.innerWidth < 640) {
      e.stopPropagation();
      return;
    }

    if (hostLinks.length === 1) {
      window.open(hostLinks[0].url, "_blank");
    } else {
      alert("coucou");
    }
  };

  return (
    <button
      className={`h-full sm:h-8 w-full rounded border border-[#1f1e1d] bg-[#0d0d0b] sm:hover:border-[#fb7ec3] sm:hover:bg-[#fb7ec3] transition-all duration-200 overflow-hidden grayscale sm:hover:grayscale-0 min-h-[32px] ${
        hostKey !== undefined && hostKey !== ""
          ? "opacity-100"
          : "opacity-0 pointer-events-none"
      }`}
      style={{
        backgroundImage: hostKey
          ? `url("${getImageForGroup(hostKey)}")`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "0",
      }}
      onClick={handleClick}
    />
  );
}
