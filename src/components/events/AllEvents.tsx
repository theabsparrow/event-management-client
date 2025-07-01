"use client";

import { TEventInfos } from "@/types/event.type";

const AllEvents = ({ events }: { events: TEventInfos[] }) => {
  console.log(events);
  return <div>this is all events</div>;
};

export default AllEvents;
