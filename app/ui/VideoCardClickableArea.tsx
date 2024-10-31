"use client";

import React from "react";
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

  const handleCardClick = () => {
    const urlPart = generateUrlPart(title);
    const videoUrl = `/video/${id}-${urlPart}`;
    alert(`URL de la vidéo : ${videoUrl}`);
  };

  return (
    <div
      className="absolute w-full h-full z-10"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    ></div>
  );
}
