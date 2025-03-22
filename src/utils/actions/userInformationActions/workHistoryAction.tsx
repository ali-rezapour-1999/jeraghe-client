"use server";
import apiGo from "@/lib/apiGo";
import { RequestResult } from "@/type/baseType";
import { WorkHistoryResponse } from "@/type/profileStateType";
import { cookies } from "next/headers";

export const workHistoryAction = async (): Promise<RequestResult> => {
  const slug = (await cookies()).get("user_slug")?.value;
  const accessToken = (await cookies()).get("access_token")?.value;

  if (!slug || !accessToken) {
    return {
      success: false,
      status: 400,
      message: "شناسه کاربر یافت نشد.",
    };
  }

  try {
    const response = await apiGo.get(`/profile/work-history/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
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
