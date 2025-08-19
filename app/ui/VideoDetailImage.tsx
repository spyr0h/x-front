"use client";

import React, { useState } from "react";
import Image from "next/image";

type VideoDetailImageProps = { picture: Picture; index: number };

export default function VideoDetailImage({
  picture,
  index,
}: VideoDetailImageProps) {
  const [imageError, setImageError] = useState(false);

  const openPicture = () => {
    window.open(picture.hostUrl, "_blank"); // Ouvre dans un nouvel onglet
  };

  const handleImageError = () => {
    setImageError(true);
  };

  if (imageError) {
    return (
      <div
        className="bg-gray-300 h-40 rounded-md flex items-center justify-center cursor-pointer"
        onClick={openPicture}
      >
        <div className="text-center">
          <div className="text-gray-500 text-sm">Image failed to load</div>
          <div className="text-gray-400 text-xs mt-1">Click to open</div>
        </div>
      </div>
    );
  }

  return (
    <div key={index} className="cursor-pointer">
      <Image
        src={picture.directUrl}
        alt={`Aperçu ${index + 1}`}
        width={320}
        height={160}
        className="w-full h-40 object-cover rounded-md"
        onClick={openPicture}
        onError={handleImageError}
        unoptimized={true}
      />
    </div>
  );
}
