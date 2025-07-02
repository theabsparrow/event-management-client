/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { updateEventData } from "@/services/eventService.ts";
import { TEventInfos } from "@/types/event.type";
import { formatTime12Hour } from "@/utills/formatTime";
import { imageUpload } from "@/utills/imageUploader";
// import { formatTime12Hour } from "@/utills/formatTime";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";
import EditComponent from "../editableComponent/EditComponent";
import { Trash2 } from "lucide-react";
import DeleteModal from "../deletemodal/DeleteModal";

const MyEventDetails = ({ eventInfo }: { eventInfo: TEventInfos }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formatedTime = formatTime12Hour(eventInfo?.time);
  const [showModal, setShowModal] = useState(false);

  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const [title, setTitle] = useState(eventInfo?.title ?? "");

  const [isDateEditing, setIsDateEditing] = useState(false);
  const [date, setDate] = useState(eventInfo?.date ?? "");

  const [isTimeEditing, setIsTimeEditing] = useState(false);
  const [time, setTime] = useState(eventInfo?.time ?? "");

  const [isLocationEditing, setIsLocationEditing] = useState(false);
  const [location, setLocation] = useState(eventInfo?.location ?? "");

  const [isDescriptionEditing, setIsDescriptionEditing] = useState(false);
  const [description, setDescription] = useState(eventInfo?.description ?? "");

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
      const updatedData = { image: imageUrl };
      const result = await updateEventData(updatedData, eventInfo?._id);
      if (result?.success) {
        toast.success(result?.message, { id: toastId, duration: 3000 });
      } else {
        toast.error(result?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleSubmit = async (field: string) => {
    const updatedData: Partial<TEventInfos> = {};
    if (field === "title") {
      if (title.trim() === eventInfo?.title) {
        toast.error("nothing to update", { duration: 3000 });
        return;
      } else {
        updatedData.title = title;
        setIsTitleEditing(false);
      }
    }
    if (field === "date") {
      if (date === eventInfo?.date) {
        toast.error("nothing to update", { duration: 3000 });
        return;
      } else {
        updatedData.date = date;
        setIsDateEditing(false);
      }
    }
    if (field === "time") {
      if (time === eventInfo?.time) {
        toast.error("nothing to update", { duration: 3000 });
        return;
      } else {
        updatedData.time = time;
        setIsTimeEditing(false);
      }
    }
    if (field === "location") {
      if (location.trim() === eventInfo?.location) {
        toast.error("nothing to update", { duration: 3000 });
        return;
      } else {
        updatedData.location = location;
        setIsLocationEditing(false);
      }
    }
    if (field === "description") {
      if (description.trim() === eventInfo?.description) {
        toast.error("nothing to update", { duration: 3000 });
        return;
      } else {
        updatedData.description = description;
        setIsDescriptionEditing(false);
      }
    }
    try {
      const result = await updateEventData(updatedData, eventInfo?._id);
      if (result?.success) {
        toast.success(result?.message, { duration: 3000 });
      } else {
        toast.error(result?.message, { duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* image section */}
      <div className="relative h-[60vh] rounded-lg overflow-hidden shadow-md mb-6 p-2 flex justify-center">
        {eventInfo?.image && (
          <Image
            src={eventInfo?.image}
            alt={eventInfo?.title}
            height={50}
            width={50}
            className="w-full md:w-[500px] object-cover rounded-xl shadow-xl"
          />
        )}
        <label className="absolute bottom-2 right-2 bg-black/50 hover:bg-black/70 p-2 rounded-full cursor-pointer">
          📷
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>
      {showModal && (
        <DeleteModal setShowModal={setShowModal} id={eventInfo?._id} />
      )}
      <div className="p-6 sm:p-10 space-y-6">
        <div className="flex justify-end">
          <button
            onClick={() => setShowModal(true)}
            className="bg-red-700 dark:bg-gray-700 px-2 py-2 text-white rounded duration-500 cursor-pointer flex items-center gap-2 "
          >
            <Trash2 className="w-5 h-5" />
            Delete
          </button>
        </div>
        {/* title */}
        <div>
          {isTitleEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => {
                const value = e.target.value;
                setTitle(value);
              }}
              className="px-2 py-1 border rounded-md w-44 dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
          ) : (
            <h1 className="text-3xl sm:text-4xl font-bold text-indigo-800 dark:text-indigo-300">
              {eventInfo?.title}
            </h1>
          )}
          <EditComponent
            setValue={setTitle}
            isEditing={isTitleEditing}
            setIsEditing={setIsTitleEditing}
            value={eventInfo?.title as string}
            handleSubmit={handleSubmit}
            field="title"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Hosted by <span className="font-semibold">{eventInfo?.name}</span>
          </p>
          <span className="bg-purple-600 text-white text-sm px-3 py-1 rounded-full shadow inline-block w-fit">
            {eventInfo?.attendeeCount} Attending
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm sm:text-base">
          {/* date */}
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
            {isDateEditing ? (
              <input
                type="date"
                value={date}
                min={(() => {
                  const tomorrow = new Date();
                  tomorrow.setDate(tomorrow.getDate() + 1);
                  return tomorrow.toISOString().split("T")[0];
                })()}
                onChange={(e) => setDate(e.target.value)}
                className="px-2 py-1 border rounded-md w-44 dark:bg-gray-800 dark:text-white dark:border-gray-600"
              />
            ) : (
              <div>
                <p className="text-gray-500 dark:text-gray-400">Date</p>
                <p className="font-medium">{eventInfo?.date}</p>
              </div>
            )}
            <EditComponent
              setValue={setDate}
              isEditing={isDateEditing}
              setIsEditing={setIsDateEditing}
              value={eventInfo?.date as string}
              handleSubmit={handleSubmit}
              field="date"
            />
          </div>

          {/* time */}
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
            {isTimeEditing ? (
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="px-2 py-1 border rounded-md w-44 dark:bg-gray-800 dark:text-white dark:border-gray-600"
              />
            ) : (
              <div>
                <p className="text-gray-500 dark:text-gray-400">Time</p>
                <p className="font-medium">{formatedTime}</p>
              </div>
            )}
            <EditComponent
              setValue={setTime}
              isEditing={isTimeEditing}
              setIsEditing={setIsTimeEditing}
              value={eventInfo?.time as string}
              handleSubmit={handleSubmit}
              field="time"
            />
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
            {isLocationEditing ? (
              <input
                type="text"
                value={location}
                onChange={(e) => {
                  const value = e.target.value;
                  setLocation(value);
                }}
                className="px-2 py-1 border rounded-md w-44 dark:bg-gray-800 dark:text-white dark:border-gray-600"
              />
            ) : (
              <div>
                <p className="text-gray-500 dark:text-gray-400">Location</p>
                <p className="font-medium">{eventInfo?.location}</p>
              </div>
            )}
            <EditComponent
              setValue={setLocation}
              isEditing={isLocationEditing}
              setIsEditing={setIsLocationEditing}
              value={eventInfo?.location as string}
              handleSubmit={handleSubmit}
              field="location"
            />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-300">
            About the Event
          </h2>
          {isDescriptionEditing ? (
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              placeholder="Enter event description..."
              className="w-full mt-2 px-3 py-2 border rounded-md text-sm sm:text-base resize-none 
               focus:outline-none focus:ring-2 focus:ring-indigo-400
               dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:placeholder-gray-500"
            />
          ) : (
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-2">
              {eventInfo?.description || "No description available."}
            </p>
          )}
          <EditComponent
            setValue={setDescription}
            isEditing={isDescriptionEditing}
            setIsEditing={setIsDescriptionEditing}
            value={eventInfo?.description as string}
            handleSubmit={handleSubmit}
            field="description"
          />
        </div>
      </div>
    </div>
  );
};

export default MyEventDetails;

// 👥
