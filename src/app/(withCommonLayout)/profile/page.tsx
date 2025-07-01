import ProfileSection from "@/components/profile/ProfileSection";
import { getMyProfle } from "@/services/profileService";

const Profile = async () => {
  const { data } = await getMyProfle();
  return (
    <div className="md:px-16 px-5">
      <ProfileSection userInfo={data} />
    </div>
  );
};

export default Profile;
