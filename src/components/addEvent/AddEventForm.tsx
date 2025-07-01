/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { TEvent } from "@/types/event.type";
import { useForm } from "react-hook-form";
import InputType from "../inputComponent/InputType";
import { useState } from "react";
import ImagePreviewer from "../inputComponent/imagePreviewer";
import ImageUploader from "../inputComponent/imageUploader";
import InputTextArea from "../inputComponent/InputTextAreas";
import { getTomorrowDate } from "@/utills/dateConverter";
import { divisions } from "./addEvents.const";
import { imageUpload } from "@/utills/imageUploader";
import { toast } from "sonner";
import { createEvent } from "@/services/eventService.ts";

const AddEventForm = () => {
  const [imageFile, setImageFile] = useState<File | "">("");
  const [imagePreview, setImagePreview] = useState<string>("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TEvent>();

  const onSubmit = async (data: TEvent) => {
    const eventInfo: TEvent = {
      title: data.title,
      date: data.date,
      time: data.time,
      location: `${data.division} ${data.district} ${data.address}`,
      description: data.description,
    };
    try {
      if (imageFile) {
        const image = await imageUpload(imageFile);
        if (!image) {
          toast.error("image uploading faild", { duration: 3000 });
          return;
        }
        eventInfo.image = image;
      }
      const res = await createEvent(eventInfo);
      if (res?.success) {
        toast.success(res?.message, { duration: 3000 });
        reset();
        setImagePreview("");
        setImageFile("");
      } else {
        toast.error(res?.message, { duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  watch("division");
  watch("district");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 flex justify-center items-start">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          Create New Event
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <InputType
            label="Title"
            name="title"
            register={register}
            error={errors.title}
            required={true}
          />

          {imagePreview ? (
            <ImagePreviewer
              setImageFile={setImageFile}
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
            />
          ) : (
            <div>
              <ImageUploader
                setImageFile={setImageFile}
                setImagePreview={setImagePreview}
              />
            </div>
          )}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-20">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                {...register("date")}
                min={getTomorrowDate()}
                className="mt-1 w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-purple-500 focus:outline-none"
              />
              {errors.date && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.date.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                {...register("time")}
                className="mt-1 w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-purple-500 focus:outline-none"
              />
              {errors.time && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.time.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Division <span className="text-red-500">*</span>
              </label>
              <select
                {...register("division", { required: "Division is required" })}
                onChange={(e) => {
                  setSelectedDivision(e.target.value);
                  setSelectedDistrict("");
                  setValue("district", "");
                }}
                className="mt-1 w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">Select Division</option>
                {Object.keys(divisions).map((division) => (
                  <option key={division} value={division}>
                    {division}
                  </option>
                ))}
              </select>
              {errors.division && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.division.message}
                </p>
              )}
            </div>
            {selectedDivision && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  District <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("district", {
                    required: "District is required",
                  })}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="mt-1 w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select District</option>
                  {divisions[selectedDivision].map((zila) => (
                    <option key={zila} value={zila}>
                      {zila}
                    </option>
                  ))}
                </select>
                {errors.district && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.district.message}
                  </p>
                )}
              </div>
            )}
            {selectedDistrict && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Location Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("address", {
                    required: "Address is required",
                    minLength: { value: 5, message: "Address is too short" },
                  })}
                  placeholder="Street, area, union, etc."
                  className="mt-1 w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                {errors.address && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>
            )}
          </div>
          <InputTextArea
            label="Description"
            name="description"
            placeholder="write a description about this event"
            register={register}
            error={errors.description}
            required={true}
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-semibold py-2 px-4 rounded hover:bg-purple-700 transition-colors cursor-pointer"
          >
            {isSubmitting ? "Loading" : "Submit Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEventForm;
