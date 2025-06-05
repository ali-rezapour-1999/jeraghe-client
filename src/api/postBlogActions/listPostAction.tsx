"use server";

import api from "@/lib/baseApi";
import { RequestResult } from "@/types/baseType";
import { PostType } from "@/types/postStateType";
import { cookies } from "next/headers";

export const listPostAction = async (): Promise<RequestResult> => {
  const slug = (await cookies()).get("user_slug")?.value;
  const accessToken = (await cookies()).get("access_token")?.value;

  if (!slug || !accessToken) {
    return {
      success: false,
      status: 400,
      message: "شناسه کاربر یافت نشد.",
    };
  }
  const response = await api.get("/blog/view-post");
  if (response.status == 200) {
    return {
      success: true,
      result: response.data as PostType,
    };
  }
  return {
    success: false,
    result: {} as PostType,
  };
};
