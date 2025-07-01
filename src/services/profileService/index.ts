/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { config } from "@/config";
import { cookies } from "next/headers";
import { getValidToken } from "../authService/getValidToken";
import { TUserInfo } from "@/types/userTypes";
import { revalidateTag } from "next/cache";

export const getMyProfle = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("refreshToken")?.value;
    if (!token) {
      throw new Error("you are not authorized");
    }
    const res = await fetch(`${config.next_public_base_api}/user/get-me`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
      next: {
        tags: ["Profile"],
      },
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateMyProfile = async (profileInfo: Partial<TUserInfo>) => {
  console.log(profileInfo);
  const token = await getValidToken();
  try {
    const res = await fetch(`${config.next_public_base_api}/user/update-data`, {
      method: "PATCH",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileInfo),
    });
    const result = await res.json();
    revalidateTag("Profile");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
