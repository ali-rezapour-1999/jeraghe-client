"use server";

import api from "@/utils/lib/api";
import { RequestResult } from "@/utils/type/baseType";
import { PostType } from "@/utils/type/postStateType";
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
      data: response.data as PostType,
    };
  }
  return {
    success: false,
    data: {} as PostType,
  };
};
