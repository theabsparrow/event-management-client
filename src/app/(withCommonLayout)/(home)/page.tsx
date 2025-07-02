import Banner from "@/components/homePage/banner/Banner";
import MostAttenedEvent from "@/components/homePage/mostAttenedEvent/MostAttenedEvent";
import RecentEvents from "@/components/homePage/recentEvents/RecentEvents";
import { getMostAttendEvent, getTwoEvents } from "@/services/eventService.ts";

const HomePage = async () => {
  const { data } = await getTwoEvents();
  const events = data.result;
  const firstTwoEvents = events.slice(0, 2);
  const firstSixEvents = events.slice(0, 6);

  const { data: mostAttendedEvents } = await getMostAttendEvent();
  const mostAttended = mostAttendedEvents?.result;

  return (
    <div className="md:px-16 px-5">
      <Banner events={firstTwoEvents} />
      <RecentEvents events={firstSixEvents} />
      <MostAttenedEvent events={mostAttended} />
    </div>
  );
};

export default HomePage;
