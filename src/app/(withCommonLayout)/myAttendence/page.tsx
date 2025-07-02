import MyAttendenceEvents from "@/components/myAttendence/MyAttendenceEvents";
import { myJoining } from "@/services/attendeeService";

const MyAttendence = async () => {
  const data = await myJoining();
  const attendedEvent = data?.data || [];
  return (
    <div className="md:px-16 px-5 mt-10">
      <MyAttendenceEvents attendeInfo={attendedEvent} />
    </div>
  );
};

export default MyAttendence;
