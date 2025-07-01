import MyEventsInfo from "@/components/myEvents/MyEvents";
import { getmyEvents } from "@/services/eventService.ts";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const MyEvents = async ({ searchParams }: { searchParams: SearchParams }) => {
  const query = await searchParams;
  const { data } = await getmyEvents(query);
  const events = data.result;
  const meta = data?.meta;
  return (
    <div className="md:px-16 px-5">
      <MyEventsInfo events={events} meta={meta} />
    </div>
  );
};

export default MyEvents;
