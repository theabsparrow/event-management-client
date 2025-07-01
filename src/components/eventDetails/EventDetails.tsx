/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { joinEvent } from "@/services/attendeeService";
import { TEventInfos } from "@/types/event.type";
import { formatTime12Hour } from "@/utills/formatTime";
import Image from "next/image";
import { toast } from "sonner";

const EventDetails = ({ eventInfo }: { eventInfo: TEventInfos }) => {
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
  } = eventInfo;

  const formatedTime = formatTime12Hour(time);

  const handleJoin = async () => {
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
      const res = await joinEvent(_id);
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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl overflow-hidden">
        {image && (
          <div className="relative w-full h-64 sm:h-80">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        )}

        <div className="p-6 space-y-4">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            {title}
          </h1>

          <div className="text-sm text-gray-600 dark:text-gray-300">
            Hosted by <span className="font-medium">{name}</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex items-center gap-2">
              📅 <span>{date}</span>
            </div>
            <div className="flex items-center gap-2">
              ⏰ <span>{formatedTime}</span>
            </div>
            <div className="flex items-center gap-2">
              📍 <span>{location}</span>
            </div>
            <div className="flex items-center gap-2">
              👥 <span>{attendeeCount} Attending</span>
            </div>
          </div>

          <hr className="border-gray-300 dark:border-gray-700" />

          <div className="text-base text-gray-800 dark:text-gray-200 leading-relaxed">
            {description}
          </div>

          <div className="pt-4">
            <button
              onClick={handleJoin}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition shadow-md"
            >
              Join Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
