"use server";

import api from "@/utils/lib/api";
import { RequestResult } from "@/utils/type/baseType";
import { cookies } from "next/headers";

export const createPostAction = async (
  data: FormData
): Promise<RequestResult> => {
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
    const response = await api.post("/blog/create-post/", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      success: true,
      status: response.status,
      message: "پست با موفقیت ایجاد شد",
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      status: error.response?.status || 500,
      message: error.message || "خطا در ثبت درخواست",
    };
  }
};
