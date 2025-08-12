"use client";

import React from "react";

type VideoDetailImageProps = { picture: Picture; index: number };

export default function VideoDetailImage({
  picture,
  index,
}: VideoDetailImageProps) {
  const openPicture = () => {
    window.open(picture.hostUrl, "_blank"); // Ouvre dans un nouvel onglet
  };

  return (
    <div key={index} className="cursor-pointer">
      <img
        src={picture.directUrl}
        alt={`Aperçu ${index + 1}`}
        className="w-full h-40 object-cover rounded-md"
        onClick={openPicture}
      />
    </div>
  );
}
