/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { config } from "@/config";
import { getValidToken } from "../authService/getValidToken";
import { revalidateTag } from "next/cache";

export const joinEvent = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/join/join-event/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    const result = await res.json();
    revalidateTag("attendee");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
