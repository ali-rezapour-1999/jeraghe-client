'use server'

import api from "@/lib/baseApi"
import { RequestResult } from "@/type/baseType"
import { PostType } from "@/type/postStateType"
import { cookies } from "next/headers"

export const createPostAction = async (data: PostType): Promise<RequestResult> => {
  const slug = (await cookies()).get('user_slug')?.value
  const accessToken = (await cookies()).get('access_token')?.value

  if (!slug || !accessToken) {
    return {
      success: false,
      status: 400,
      message: "شناسه کاربر یافت نشد.",
    };
  }
  try {
    const response = await api.post('/post/', data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    if (response.status === 200 || response.status === 201) {
      return {
        success: true,
        status: response.status,
        message: "درخواست شما ثبت شده",
      };
    } else {
      return {
        success: false,
        status: response.status,
        message: "خطا در ثبت درخواست",
      };
    }
  } catch (error) {
    const status =
      (error as { response?: { status?: number } })?.response?.status || 500;

    let message = "";
    switch (status) {
      case 404:
        message = "حساب کاربری پیدا نشد";
        break;
      case 400:
        message = "پست مورد نظر با این عنوان موجود میباشد";
        break;
      case 500:
        message = "خطای سرور. لطفاً مجدد تلاش کنید.";
        break;
      default:
        message = "خطای ناشناخته.";
        break;
    }
    return {
      success: false,
      status: status,
      message: message,
    };
  }
}

