/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { updateMyProfile } from "@/services/profileService";
import { imageUpload } from "@/utills/imageUploader";
import Image from "next/image";
import { useRef } from "react";
import { FaCamera } from "react-icons/fa";
import { toast } from "sonner";

const ImageSection = ({ image }: { image: string }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      toast.error("faild to upload image", { duration: 3000 });
      return;
    }
    const toastId = toast.loading("image uploading...");
    try {
      const imageUrl = await imageUpload(file);
      if (!imageUrl) {
        toast.error("faild to upload image", { id: toastId, duration: 3000 });
        return;
      }
      const updatedData = { photoURL: imageUrl };
      const result = await updateMyProfile(updatedData);
      if (result?.success) {
        toast.success(result?.message, { id: toastId, duration: 3000 });
      } else {
        toast.error(result?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="relative w-72 h-72">
      {image ? (
        <Image
          src={image}
          alt="Profile"
          width={400}
          height={400}
          className="rounded-full object-cover border-4 border-white shadow-md w-72 h-72"
        />
      ) : (
        <div className="rounded-full border-4 border-white shadow-md w-72 h-72 bg-green-500"></div>
      )}

      <label className="absolute bottom-1 right-18 z-10 cursor-pointer">
        <div className="bg-white p-2 rounded-full">
          <FaCamera className="text-black group-hover:text-white text-2xl transition duration-300" />
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default ImageSection;
