"use server";
import apiGo from "@/utils/lib/apiGo";
import { RequestResult } from "@/utils/type/baseType";
import { ProfileResponse } from "@/utils/type/profileStateType";
import { cookies } from "next/headers";

export const profileRequestAction = async (): Promise<RequestResult> => {
  const slug = (await cookies()).get("user_slug")?.value;
  const accessToken = (await cookies()).get("access_token")?.value;
  try {
    if (slug) {
      const response = await apiGo.get(`profile/info/${slug}`, {
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
