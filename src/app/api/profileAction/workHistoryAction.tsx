"use server";
import api from "@/lib/baseApi";
import { WorkHistoryResponse } from "@/type/profileStateType";
import { cookies } from "next/headers";

export const workHistoryAction = async (): Promise<{
  success: boolean;
  data: WorkHistoryResponse;
}> => {
  const slug = (await cookies()).get("user_slug");
  try {
    const response = await api.get(`/profile/work-history/${slug?.value}/`);
    return {
      data: response.data as WorkHistoryResponse,
      success: true,
    };
  } catch {
    return {
      data: {} as WorkHistoryResponse,
      success: false,
    };
  }
};
