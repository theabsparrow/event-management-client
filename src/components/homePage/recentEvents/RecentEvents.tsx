"use client";

import EventCard from "@/components/eventCard/EventCard";
import { TEventInfos } from "@/types/event.type";

const RecentEvents = ({ events }: { events: TEventInfos[] }) => {
  return (
    <>
      {events.length === 0 ? (
        <div>
          <h1 className="text-2xl font-semibold text-center text-gray-600 mt-10">
            No data available right now
          </h1>
        </div>
      ) : (
        <div className="mt-10">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Recent Events</h2>
            <p className="text-gray-500 mt-2">
              Stay updated with the latest happenings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {events.map((event) => (
              <EventCard key={event?._id} event={event} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RecentEvents;
