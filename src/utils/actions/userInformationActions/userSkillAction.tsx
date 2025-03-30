"use server";
import api from "@/utils/lib/api";
import { RequestResult } from "@/utils/type/baseType";
import { WorkHistoryResponse } from "@/utils/type/profileStateType";
import { cookies } from "next/headers";

export const UserSkillsAction = async (): Promise<RequestResult> => {
  const accessToken = (await cookies()).get("access_token");
  const slug = (await cookies()).get("slug");
  if (!slug || !accessToken) {
    return {
      success: false,
      status: 400,
      message: "شناسه کاربر یافت نشد.",
    };
  }

  try {
    const response = await api.get(`/profile/user-skills`, {
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
