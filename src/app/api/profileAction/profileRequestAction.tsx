"use server";
import api from "@/lib/baseApi";
import { ProfileResponse } from "@/type/profileStateType";
import { cookies } from "next/headers";

export const profileRequestAction = async (): Promise<{
  success: boolean;
  data: ProfileResponse;
}> => {
  const slug = (await cookies()).get("user_slug")?.value;
  try {
    if (!slug) {
      return { data: {} as ProfileResponse, success: false };
    } else {
      const response = await api.get(`/profile/profiles/${slug}/`);
      return {
        data: response.data as ProfileResponse,
        success: true,
      };
    }
  } catch {
    return {
      data: {} as ProfileResponse,
      success: false,
    };
  }
};
