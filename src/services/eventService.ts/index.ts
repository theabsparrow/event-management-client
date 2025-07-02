/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { config } from "@/config";
import { TEvent } from "@/types/event.type";
import { getValidToken } from "../authService/getValidToken";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllEvents = async (query?: {
  [key: string]: string | string[] | undefined;
}) => {
  try {
    const params = new URLSearchParams();
    if (query?.searchTerm) {
      params.append("searchTerm", query?.searchTerm.toString());
    }
    if (query?.startDate) {
      params.append("startDate", query?.startDate.toString());
    }
    if (query?.endDate) {
      params.append("endDate", query?.endDate.toString());
    }
    if (query?.date) {
      params.append("date", query?.date.toString());
    }
    if (query?.page) {
      params.append("page", query?.page.toString());
    }
    const res = await fetch(
      `${config.next_public_base_api}/event/all-events?limit=20&${params}`,
      {
        method: "GET",
        next: {
          tags: ["Events"],
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
export const getTwoEvents = async () => {
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
export const getMostAttendEvent = async () => {
  try {
    const res = await fetch(
      `${config.next_public_base_api}/event/all-events?limit=6&sort=attendeeCount`,
      {
        method: "GET",
        next: {
          tags: ["Events"],
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getASingleEvent = async (id: string) => {
  try {
    const res = await fetch(
      `${config.next_public_base_api}/event/single-event/${id}`,
      {
        method: "GET",
        next: {
          tags: ["Event"],
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getmyEvents = async (query?: {
  [key: string]: string | string[] | undefined;
}) => {
  try {
    const params = new URLSearchParams();
    if (query?.searchTerm) {
      params.append("searchTerm", query?.searchTerm.toString());
    }
    if (query?.page) {
      params.append("page", query?.page.toString());
    }
    const cookieStore = await cookies();
    const token = cookieStore.get("refreshToken")?.value;
    if (!token) {
      throw new Error("you are not authorized");
    }
    const res = await fetch(
      `${config.next_public_base_api}/event/my-events?limit=20&${params}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["myEvent"],
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const GetMySingleEventInfo = async (id: string) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("refreshToken")?.value;
    if (!token) {
      throw new Error("you are not authorized");
    }
    const res = await fetch(
      `${config.next_public_base_api}/event/mySingle-event/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["myEvent"],
        },
      }
    );
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
