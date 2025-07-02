/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { config } from "@/config";
import { getValidToken } from "../authService/getValidToken";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

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

export const cancelEvent = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/join/cancel-joining/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
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

export const myJoining = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("refreshToken")!.value;
    const res = await fetch(
      `${config.next_public_base_api}/join/joined-events`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["attendee"],
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
