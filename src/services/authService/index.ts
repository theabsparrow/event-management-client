"use server";

import { loginFormValues } from "@/components/Login/LoginForm";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { config } from "@/config";
import { FormValues } from "@/types/signUp.types";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const registerUser = async (userData: FormValues) => {
  try {
    const res = await fetch(`${config.next_public_base_api}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await res.json();
    if (result?.success) {
      (await cookies()).set("refreshToken", result?.data?.refreshToken);
      (await cookies()).set("accessToken", result?.data?.accessToken);
    }
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const loginUser = async (loginData: loginFormValues) => {
  try {
    const res = await fetch(`${config.next_public_base_api}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    const result = await res.json();
    if (result?.success) {
      (await cookies()).set("refreshToken", result?.data?.refreshToken);
      (await cookies()).set("accessToken", result?.data?.accessToken);
    }
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getCurrentUser = async () => {
  const refreshToken = (await cookies()).get("refreshToken")?.value;
  let decodedData = null;
  if (refreshToken) {
    decodedData = await jwtDecode(refreshToken);
    return decodedData;
  } else {
    return null;
  }
};
