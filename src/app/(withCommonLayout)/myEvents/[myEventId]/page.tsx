import MyEventDetails from "@/components/myEventDetails/MyEventDetails";
import { GetMySingleEventInfo } from "@/services/eventService.ts";

const GetMySingleEvent = async ({
  params,
}: {
  params: Promise<{ myEventId: string }>;
}) => {
  const myEventId = await params;
  const { data } = await GetMySingleEventInfo(myEventId.myEventId);

  return (
    <div>
      <MyEventDetails eventInfo={data} />
    </div>
  );
};

export default GetMySingleEvent;
