"use server";

import api from "@/lib/baseApi";
import { RequestResult } from "@/types/baseType";
import { cookies } from "next/headers";

export const socialMediaDeleteAction = async (
  slug: string
): Promise<RequestResult> => {
  const accessToken = (await cookies()).get("access_token")?.value;

  if (!accessToken) {
    return {
      success: false,
      status: 400,
      message: "شناسه کاربر یافت نشد.",
    };
  }
  const response = await api.delete(`/private/profile/social-media/${slug}/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.status == 200 || response.status == 204) {
    return {
      success: true,
      status: response.status,
      message: "درخواست شما ثبت شده",
    };
  }
  return {
    success: false,
    status: response.status,
    message: "درخواست شما با خطا مواجه شده",
  };
};
