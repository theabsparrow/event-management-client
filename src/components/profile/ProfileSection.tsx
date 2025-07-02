/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { TUserInfo } from "@/types/userTypes";
import ImageSection from "./ImageSection";
import { useState } from "react";
import EditComponent from "../editableComponent/EditComponent";
import { toast } from "sonner";
import { updateMyProfile } from "@/services/profileService";

const ProfileSection = ({ userInfo }: { userInfo: TUserInfo }) => {
  const [isNameEditing, setIsEditingName] = useState(false);
  const [userName, setUserName] = useState(userInfo?.name ?? "");

  const [isEmailEditing, setIsEmailEditing] = useState(false);
  const [userEmail, setUserEmail] = useState(userInfo?.email ?? "");

  const handleSubmit = async (field: string) => {
    const updatedData: Partial<TUserInfo> = {};

    if (field === "name") {
      if (userName.trim() === userInfo?.name) {
        toast.error("nothing to update", { duration: 3000 });
        return;
      } else {
        updatedData.name = userName;
        setIsEditingName(false);
      }
    }

    if (field === "email") {
      if (userEmail.trim() === userInfo?.email) {
        toast.error("nothing to update", { duration: 3000 });
        return;
      } else {
        updatedData.email = userEmail;
        setIsEmailEditing(false);
      }
    }

    try {
      const result = await updateMyProfile(updatedData);
      if (result?.success) {
        toast.success(result?.message, { duration: 3000 });
      } else {
        toast.error(result?.message, { duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-lg overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6">
          <ImageSection image={userInfo?.photoURL as string} />
          <div className="text-center sm:text-left">
            <div>
              {isNameEditing ? (
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => {
                    const value = e.target.value;
                    setUserName(value);
                  }}
                  className="px-2 py-1 border rounded-md w-44 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                />
              ) : (
                <h2 className="text-3xl font-semibold text-indigo-900 dark:text-indigo-300">
                  {userInfo?.name}
                </h2>
              )}
              <EditComponent
                setValue={setUserName}
                isEditing={isNameEditing}
                setIsEditing={setIsEditingName}
                value={userInfo?.name as string}
                handleSubmit={handleSubmit}
                field="name"
              />
            </div>
            <div>
              {isEmailEditing ? (
                <input
                  type="text"
                  value={userEmail}
                  onChange={(e) => {
                    const value = e.target.value;
                    setUserEmail(value);
                  }}
                  className="px-2 py-1 border rounded-md w-44 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                />
              ) : (
                <h2 className="text-3xl font-semibold text-indigo-900 dark:text-indigo-300">
                  {userInfo?.email || "Unknown User"}
                </h2>
              )}
              <EditComponent
                setValue={setUserEmail}
                isEditing={isEmailEditing}
                setIsEditing={setIsEmailEditing}
                value={userInfo?.email as string}
                handleSubmit={handleSubmit}
                field="email"
              />
            </div>
            <span className="mt-2 inline-block bg-purple-600 text-white text-sm px-3 py-1 rounded-full shadow-sm">
              {userInfo?.role}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
