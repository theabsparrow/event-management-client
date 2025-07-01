"use client";

import { TEventInfos } from "@/types/event.type";
import { formatTime12Hour } from "@/utills/formatTime";
import Image from "next/image";
import Link from "next/link";

const MyEventCard = ({ event }: { event: TEventInfos }) => {
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
            href={`myEvents/${_id}`}
            className="text-blue-600 hover:underline"
          >
            Read more
          </Link>
        </p>
      </div>
    </div>
  );
};

export default MyEventCard;
