"use server";
import api from "@/utils/lib/api";
import { RequestResult } from "@/utils/type/baseType";
import { ProfileResponse } from "@/utils/type/profileStateType";
import { cookies } from "next/headers";

export const profileRequestAction = async (): Promise<RequestResult> => {
  const accessToken = (await cookies()).get("access_token")?.value;
  try {
    if (accessToken) {
      const response = await api.get(`private/profile/info`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return {
        data: response.data as ProfileResponse,
        success: true,
      };
    } else {
      return {
        data: {} as ProfileResponse,
        success: false,
      };
    }
  } catch {
    return {
      data: {} as ProfileResponse,
      success: false,
    };
  }
};
