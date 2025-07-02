"use client";

import { TEventInfos } from "@/types/event.type";
import EventCard from "../eventCard/EventCard";
import { TMetaDataProps } from "@/types/metaType";
import Pagination from "../pagination/Pagination";
import EventFiltering from "../eventFiltering/EventFiltering";

const AllEvents = ({
  events,
  meta,
}: {
  events: TEventInfos[];
  meta: TMetaDataProps;
}) => {
  return (
    <>
      <EventFiltering length={events.length} />
      {events.length === 0 ? (
        <div>
          <h1 className="text-4xl flex justify-center mt-10 text-purple-700">
            No data available right now
          </h1>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-5">
          {events.map((event) => (
            <EventCard key={event?._id} event={event} />
          ))}
        </div>
      )}

      {events?.length > 0 && <Pagination totalPage={meta?.totalPage} />}
    </>
  );
};

export default AllEvents;
