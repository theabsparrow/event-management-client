import Banner from "@/components/homePage/banner/Banner";
import { getTwoEvents } from "@/services/eventService.ts";

const HomePage = async () => {
  const { data } = await getTwoEvents();
  const events = data.result;
  return (
    <div className="md:px-16 px-5">
      <Banner events={events} />
    </div>
  );
};

export default HomePage;
