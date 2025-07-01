"use client";

import { TUserInfo } from "@/types/userTypes";
import ImageSection from "./ImageSection";

const ProfileSection = ({ userInfo }: { userInfo: TUserInfo }) => {
  const { name, email, photoURL, role } = userInfo;
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-lg overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6">
          <ImageSection image={photoURL as string} />
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {name}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">{email}</p>
            <span className="mt-2 inline-block bg-purple-600 text-white text-sm px-3 py-1 rounded-full shadow-sm">
              {role}
            </span>
          </div>
        </div>

        {/* Footer or Extras */}
        <div className="border-t dark:border-gray-700 px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
          Welcome to your dashboard. You can manage your events and account
          settings from here.
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
