"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

const VideoCard = ({ video }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const imageUrls = video.pictures.map(picture => picture.directUrl);

  useEffect(() => {
    let interval;

    if (isHovered && imageUrls.length > 1) { // Commencer le diaporama seulement si plus d'une image
      interval = setInterval(() => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % imageUrls.length);
      }, 750); // Change l'image toutes les 0.5 secondes
    } else {
      setCurrentImageIndex(0); // Réinitialise à la première image lorsqu'il n'est pas survolé
    }

    return () => clearInterval(interval);
  }, [isHovered, imageUrls.length]);

  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-1 h-96 flex flex-col cursor-pointer" // Marges réduites à m-1
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImageIndex(0); // Réinitialise l'image au départ
      }}
    >
      {/* Image avec taille fixe et fallback en cas d'absence */}
      <div className="flex-shrink-0 h-1/2 overflow-hidden relative">
        {imageUrls.length > 0 ? (
          <img
            className="w-full h-full object-cover"
            src={imageUrls[currentImageIndex]} // Utilise l'index actuel pour l'image
            alt={video.title}
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-500">No Image Available</span>
          </div>
        )}
        
        {/* Pastille de durée en bas à droite */}
        {video.duration && (
          <div className="absolute bottom-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
            {video.duration}
          </div>
        )}
      </div>
      <div className="px-6 py-2 flex-1 flex flex-col">
        {/* Titre limité à 2 lignes avec "..." */}
        <h2 className="text-black font-bold text-xl mb-1 overflow-hidden overflow-ellipsis line-clamp-2">
          {video.title}
        </h2>

        {/* Description avec text-overflow */}
        <p className="text-gray-700 text-base flex-1 overflow-hidden overflow-ellipsis whitespace-nowrap mb-1">
          {video.description.trim()}
        </p>

        {/* Affichage des tags sous forme de pastilles, max 3 tags */}
        <div className="flex flex-wrap mt-1">
          {video.tags.slice(0, 3).map(tag => (
            <Link key={tag.id} href={`/video/search?tags=${encodeURIComponent(tag.value)}`}>
              <span className="inline-block bg-blue-200 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full mr-2 mb-1 cursor-pointer">
                {tag.value}
              </span>
            </Link>
          ))}
        </div>
      </div>
      <div className="px-6 py-2">
        <a
          href={video.links[0]?.url}
          className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Watch Video
        </a>
      </div>
    </div>
  );
};

export default VideoCard;
