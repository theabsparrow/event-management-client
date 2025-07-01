"use client";

type TImageUploader = {
  setImageFile: React.Dispatch<React.SetStateAction<File | "">>;
  setImagePreview: React.Dispatch<React.SetStateAction<string>>;
};

const ImageUploader = ({ setImageFile, setImagePreview }: TImageUploader) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File;
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };
  return (
    <div>
      <label>
        {" "}
        Upload Image <span className="text-red-500">*</span>
      </label>
      <input
        type="file"
        id="image-upload"
        accept="image/*"
        onChange={(e) => handleImageChange(e)}
        className="hidden"
      />
      <label
        htmlFor="image-upload"
        className="md:w-[13vw] w-[40vw] h-[15vh] flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-blue-400 transition"
      >
        {" "}
        <span className="text-gray-500 dark:text-gray-400 text-sm text-center">
          Click to upload file <br /> (Only image files)
        </span>
      </label>
    </div>
  );
};

export default ImageUploader;
