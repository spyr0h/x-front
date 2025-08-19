"use client";

import React from "react";
import Link from "next/link";
import { useHover } from "../context/HoverContext";

type VideoCardClickableAreaProps = { url: string };

export default function VideoCardClickableArea({
  url,
}: VideoCardClickableAreaProps) {
  const { setIsHovered } = useHover();

  return (
    <Link
      className="absolute w-full h-full z-10"
      href={url}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    ></Link>
  );
}
