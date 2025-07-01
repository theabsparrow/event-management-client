"use client";

import { TEventInfos } from "@/types/event.type";
import { TMetaDataProps } from "@/types/metaType";
import Pagination from "../pagination/Pagination";
import MyEventCard from "../myEventCard/MyEventCard";

const MyEventsInfo = ({
  events,
  meta,
}: {
  events: TEventInfos[];
  meta: TMetaDataProps;
}) => {
  return (
    <>
      {events.length === 0 ? (
        <div>
          <h1>no data available right now</h1>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
          {events.map((event) => (
            <MyEventCard key={event?._id} event={event} />
          ))}
        </div>
      )}

      {events?.length > 0 && <Pagination totalPage={meta?.totalPage} />}
    </>
  );
};

export default MyEventsInfo;
