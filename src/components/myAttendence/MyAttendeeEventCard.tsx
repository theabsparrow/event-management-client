/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cancelEvent } from "@/services/attendeeService";
import { TEventInfos } from "@/types/event.type";
import { formatTime12Hour } from "@/utills/formatTime";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

const MyAttendeeEventCard = ({ event }: { event: TEventInfos }) => {
  const {
    title,
    name,
    image,
    date,
    time,
    location,
    description,
    _id,
    attendeeCount,
  } = event;
  const formatedTime = formatTime12Hour(time);

  const eventDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleCancel = async () => {
    const eventDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (eventDate < today) {
      toast.error("you can`t join previous event");
      return;
    }
    if (eventDate === today) {
      const [eventHour, eventMinute] = time.split(":").map(Number);
      const eventDateTime = new Date();
      eventDateTime.setHours(eventHour, eventMinute, 0, 0);
      const now = new Date();
      if (eventDateTime < now) {
        toast.error("you can`t join previous event");
        return;
      }
    }
    try {
      const res = await cancelEvent(_id);
      if (res?.success) {
        toast.success(res?.message, { duration: 3000 });
      } else {
        toast.error(res?.message, { duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden transition hover:shadow-lg p-4">
      {image && (
        <div className="w-full h-52 relative rounded-xl shadow-xl">
          <Image src={image} alt={title} fill className="object-cover " />
        </div>
      )}

      <div className=" space-y-2 mt-10">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white line-clamp-2">
          {title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Hosted by <span className="font-medium">{name}</span>
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700 dark:text-gray-300 mt-2">
          <div className="flex justify-between items-center gap-1">
            📅 <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            ⏰ <span>{formatedTime}</span>
          </div>
          <div className="flex items-center gap-1">
            👥 <span>{attendeeCount} Attending</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          📍 {location}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
          {description.split("").slice(0, 40).join("") +
            (description.split(" ").length > 20 ? "..." : "")}
          ...{" "}
          <Link
            href={`events/${_id}`}
            className="text-blue-600 hover:underline"
          >
            Read more
          </Link>
        </p>

        <div className="pt-3">
          {eventDate < today ? (
            <h1>this event is Over</h1>
          ) : (
            <button
              onClick={handleCancel}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAttendeeEventCard;
