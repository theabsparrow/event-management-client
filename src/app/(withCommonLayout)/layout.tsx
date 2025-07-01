import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { getMyProfle } from "@/services/profileService";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  const { data } = await getMyProfle();

  return (
    <div>
      <Navbar userInfo={data} />
      <main className="min-h-screen"> {children}</main>
      <Footer />
    </div>
  );
};

export default CommonLayout;
