import EventDetails from "@/components/eventDetails/EventDetails";
import { getASingleEvent } from "@/services/eventService.ts";

const SingleEvent = async ({
  params,
}: {
  params: Promise<{ eventID: string }>;
}) => {
  const eventID = await params;
  const { data } = await getASingleEvent(eventID.eventID);
  return (
    <div>
      <EventDetails eventInfo={data} />
    </div>
  );
};

export default SingleEvent;
