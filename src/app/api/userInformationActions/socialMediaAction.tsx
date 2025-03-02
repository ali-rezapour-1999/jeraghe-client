"use server";

import api from "@/lib/baseApi";
import { RequestResult } from "@/type/baseType";
import { SocialMediaResponse } from "@/type/profileStateType";
import { cookies } from "next/headers";

export const socialMediaAction = async (): Promise<RequestResult> => {
  const slug = (await cookies()).get("user_slug")?.value;
  const accessToken = (await cookies()).get("access_token")?.value;

  if (!slug || !accessToken) {
    return {
      success: false,
      status: 400,
      message: "شناسه کاربر یافت نشد.",
    };
  }
  const response = await api.get(`/profile/social-media`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.status == 200 || response.status == 201) {
    return {
      success: true,
      data: response.data as SocialMediaResponse,
    };
  }

  return {
    success: false,
    data: {} as SocialMediaResponse,
  };
};
