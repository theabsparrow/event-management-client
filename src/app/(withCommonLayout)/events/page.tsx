import AllEvents from "@/components/events/AllEvents";
import { getAllEvents } from "@/services/eventService.ts";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const EventPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const query = await searchParams;
  const { data } = await getAllEvents(query);
  const events = data.result;
  const meta = data?.meta;
  return (
    <div className="md:px-16 px-5">
      <AllEvents events={events} meta={meta} />
    </div>
  );
};

export default EventPage;
