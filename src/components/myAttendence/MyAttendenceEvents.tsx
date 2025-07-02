"use client";

import { TAtendee } from "@/types/attendenceType";
import MyAttendeeEventCard from "./MyAttendeeEventCard";

const MyAttendenceEvents = ({ attendeInfo }: { attendeInfo: TAtendee[] }) => {
  return (
    <>
      {attendeInfo.length === 0 ? (
        <div>
          <h1>no data available right now</h1>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {attendeInfo.map((event) => (
            <MyAttendeeEventCard key={event?._id} event={event?.eventId} />
          ))}
        </div>
      )}
    </>
  );
};

export default MyAttendenceEvents;
