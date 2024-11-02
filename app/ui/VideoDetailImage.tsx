"use client";

import React from "react";
import { useState } from "react";

type VideoDetailImageProps = { picture: Picture; index: number };

export default function VideoDetailImage({
  picture,
  index,
}: VideoDetailImageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div key={index} className="cursor-pointer">
      <img
        src={picture.directUrl}
        alt={`Aperçu ${index + 1}`}
        className="w-full h-40 object-cover rounded-lg"
        onClick={openModal}
      />
      {isModalOpen && (
        <dialog id={`img_${index}_modal`} className="modal modal-open">
          <div className="modal-box w-full flex justify-center items-center text-center">
            <img
              src={picture.directUrl}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={closeModal}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
}
