"use client";

import { X } from "lucide-react";
import Image from "next/image";

type TImangePreviewer = {
  setImageFile: React.Dispatch<React.SetStateAction<File | "">>;
  imagePreview: string;
  setImagePreview: React.Dispatch<React.SetStateAction<string>>;
};

const ImagePreviewer = ({
  setImageFile,
  imagePreview,
  setImagePreview,
}: TImangePreviewer) => {
  const handleRemove = () => {
    setImageFile("");
    setImagePreview("");
  };

  return (
    <div className="relative w-36 h-36 rounded-md overflow-hidden border border-dashed border-gray-300">
      <Image
        width={500}
        height={500}
        src={imagePreview}
        alt={`Profile image`}
        className="w-full h-full"
      />
      <button
        type="button"
        onClick={handleRemove}
        className="bg-red-300 hover:bg-red-400 absolute -top-0 -right-0 w-6 h-6 p-0 rounded-full cursor-pointer"
      >
        <X className="w-4 h-4 mx-auto" />
      </button>
    </div>
  );
};

export default ImagePreviewer;
