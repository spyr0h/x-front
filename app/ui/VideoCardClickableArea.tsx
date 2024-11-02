"use client";

import React from "react";
import Link from "next/link";
import { useHover } from "../context/HoverContext";

type VideoCardClickableAreaProps = { id: number; title: string };

export default function VideoCardClickableArea({
  id,
  title,
}: VideoCardClickableAreaProps) {
  const { setIsHovered } = useHover();
  const generateUrlPart = (title: string) => {
    return title
      .normalize("NFD") // Supprime les accents
      .replace(/[\u0300-\u036f]/g, "") // Retire les diacritiques
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "") // Supprime les caractères spéciaux
      .replace(/\s+/g, "-"); // Remplace les espaces par des tirets
  };

  const url = `/video/${id}-${generateUrlPart(title)}`;

  return (
    <Link
      className="absolute w-full h-full z-10"
      href={url}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    ></Link>
  );
}
