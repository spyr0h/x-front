"use client";

import React, { useState } from "react";

type VideoDetailDescriptionProps = { description: string };

export default function VideoDetailDescription({
  description,
}: VideoDetailDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {description && (
        <div>
          <h2 className="text-xl font-semibold mt-5 mb-2">Description</h2>
          <div
            className={`text-gray-600 relative overflow-hidden ${
              !isExpanded ? "max-h-24" : ""
            }`}
            style={{
              WebkitMaskImage: !isExpanded
                ? "linear-gradient(180deg, rgba(0,0,0,1) 60%, transparent)"
                : "none",
            }}
          >
            <p className="whitespace-pre-line">{description}</p>
          </div>
          {!isExpanded && (
            <button
              onClick={toggleExpand}
              className="mt-2 text-blue-500 hover:underline"
            >
              Lire la suite
            </button>
          )}
          {isExpanded && (
            <button
              onClick={toggleExpand}
              className="mt-2 text-blue-500 hover:underline"
            >
              Masquer
            </button>
          )}
        </div>
      )}
    </>
  );
}
