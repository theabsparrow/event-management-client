"use client";

import { TEventInfos } from "@/types/event.type";
import { formatTime12Hour } from "@/utills/formatTime";
import Image from "next/image";
import { toast } from "sonner";

const Banner = ({ events }: { events: TEventInfos[] }) => {
  const handleJoin = async (id: string, date: string, time: string) => {
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
  };
  return (
    <section className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 dark:from-purple-800 dark:via-purple-900 dark:to-purple-950 py-12 px-4 sm:px-6 lg:px-8 mt-10 rounded-lg">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          Discover & Join Exciting Events
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Explore trending events and grow your network with professionals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {events.map((event) => (
          <div
            key={event?._id}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden"
          >
            {event?.image && (
              <div className="relative w-full h-48">
                <Image
                  src={event?.image}
                  alt={event?.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {event?.title}
              </h3>
              <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                📅 {event?.date} &nbsp; ⏰ {formatTime12Hour(event?.time)}
              </div>
              <button
                onClick={() => handleJoin(event?._id, event?.date, event?.time)}
                className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition cursor-pointer"
              >
                Join Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Banner;
