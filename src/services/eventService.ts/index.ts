/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { config } from "@/config";
import { TEvent } from "@/types/event.type";
import { getValidToken } from "../authService/getValidToken";
import { revalidateTag } from "next/cache";

export const getAllEvents = async () => {
  try {
    const res = await fetch(`${config.next_public_base_api}/event/all-events`, {
      method: "GET",
      next: {
        tags: ["Events"],
      },
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const createEvent = async (eventInfo: TEvent) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/event/create-event`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventInfo),
      }
    );
    const result = await res.json();
    revalidateTag("Events");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
