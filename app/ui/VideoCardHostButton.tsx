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
  const handleClick = () => {
    if (hostLinks.length === 1) {
      window.open(hostLinks[0].url, "_blank");
    } else {
      alert("coucou");
    }
  };

  return (
    <button
      className={`btn overflow-hidden w-full grayscale hover:grayscale-0 transition-all duration-300 z-20 ${
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
        padding: "0",
      }}
      onClick={handleClick}
    />
  );
}
