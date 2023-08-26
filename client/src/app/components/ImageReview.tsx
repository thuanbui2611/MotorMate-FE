import { useState } from "react";

interface Props {
  src: string;
  onClose: () => void;
}
export default function ImageReview(props: Props) {
  return (
    <>
      {/* popup image */}
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 space-x-0">
        <div className="max-w-full max-h-full relative">
          <img
            alt="nature"
            className="w-full h-auto max-h-[90vh] object-cover object-center"
            src={props.src}
          />
          <button
            className="absolute top-0 right-0 text-white font-bold bg-gray-800 text-sm md:text-base rounded-full p-1 px-2"
            onClick={props.onClose}
          >
            X
          </button>
        </div>
      </div>
    </>
  );
}
