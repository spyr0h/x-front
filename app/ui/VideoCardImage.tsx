"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

type VideoCardImageProps = {
  pictures: Picture[];
};

export default function VideoCardImage({ pictures }: VideoCardImageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const imageUrls = pictures.map((picture) => picture.directUrl).reverse();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isHovered && imageUrls.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
      }, 750);
    } else {
      setCurrentImageIndex(0);
    }

    return () => clearInterval(interval);
  }, [isHovered, imageUrls.length]);

  return (
    <div>
      <div
        className="w-full h-full bg-gray-300 flex items-center justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setCurrentImageIndex(0);
        }}
      >
        {imageUrls.length > 0 ? (
          <Image
            className="w-full h-full object-cover"
            src={imageUrls[currentImageIndex]}
            alt={`Video image ${currentImageIndex + 1}`}
            width={100}
            height={100}
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-500">No Image Available</span>
          </div>
        )}
      </div>
    </div>
  );
}
