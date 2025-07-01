import AllEvents from "@/components/events/AllEvents";
import { getAllEvents } from "@/services/eventService.ts";

const EventPage = async () => {
  const { data } = await getAllEvents();
  const events = data.result;
  return (
    <div>
      <AllEvents events={events} />
    </div>
  );
};

export default EventPage;
