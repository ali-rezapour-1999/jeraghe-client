"use server";
import apiDjango from "@/lib/apiDjango";
import { RequestResult } from "@/type/baseType";
import { WorkHistoryResponse } from "@/type/profileStateType";
import { cookies } from "next/headers";

export const workHistoryAction = async (): Promise<RequestResult> => {
  const slug = (await cookies()).get("user_slug");
  try {
    const response = await apiDjango.get(`/profile/work-history/${slug?.value}/`);
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
