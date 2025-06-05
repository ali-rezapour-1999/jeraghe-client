"use server";
import api from "@/lib/baseApi";
import { RequestResult } from "@/types/baseType";
import { ProfileResponse } from "@/types/profileStateType";
import { cookies } from "next/headers";

export const profileRequestAction = async (): Promise<RequestResult> => {
  const accessToken = (await cookies()).get("access_token")?.value;
  try {
    if (accessToken) {
      const response = await api.get(`public/get-profile/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return {
        result: response.data,
        message: response.data.message,
        success: true,
      };
    } else {
      return {
        result: {} as ProfileResponse,
        success: false,
      };
    }
  } catch {
    return {
      result: {} as ProfileResponse,
      success: false,
    };
  }
};
