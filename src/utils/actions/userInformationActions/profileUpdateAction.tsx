"use server";
import api from "@/utils/lib/api";
import { RequestResult } from "@/utils/type/baseType";
import { ProfileResponse } from "@/utils/type/profileStateType";
import { cookies } from "next/headers";

export const profileUpdateAction = async (
  updateData: ProfileResponse
): Promise<RequestResult> => {
  const slug = (await cookies()).get("user_id")?.value;
  const accessToken = (await cookies()).get("access_token")?.value;

  if (!slug || !accessToken) {
    return {
      success: false,
      status: 400,
      message: "شناسه کاربر یافت نشد.",
    };
  }

  try {
    const response = await api.patch(`/private/profile/update/`, updateData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.data.status === "success") {
      return {
        success: true,
        status: response.status,
        message: response.data.message,
      };
    }

    return {
      success: false,
      status: response.status,
      message: response.data.message,
    };
  } catch (error: any) {
    return {
      success: false,
      status: error?.response?.status || 500,
      message:
        error?.response?.data?.message ||
        error.message ||
        "خطای ناشناخته‌ای رخ داد.",
    };
  }
};
