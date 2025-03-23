"use server";
import apiDjango from "@/utils/lib/apiDjango";
import { RequestResult } from "@/utils/type/baseType";
import { ProfileResponse } from "@/utils/type/profileStateType";
import { cookies } from "next/headers";

export const profileUpdateAction = async (
  data: ProfileResponse
): Promise<RequestResult> => {
  const slug = (await cookies()).get("user_slug")?.value;
  const accessToken = (await cookies()).get("access_token")?.value;

  if (!slug && !accessToken) {
    return {
      success: false,
      status: 400,
      message: "شناسه کاربر یافت نشد.",
    };
  }
  try {
    const response = await apiDjango.patch<ProfileResponse>(
      `/profile/profile-info/${slug}/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.status === 200) {
      return {
        success: true,
        status: response.status,
        message: "تغییر شما ثبت شده",
      };
    }

    return {
      success: false,
      status: response.status,
      message: "خطا در به‌روزرسانی پروفایل.",
    };
  } catch (error) {
    const status =
      (error as { response?: { status?: number } })?.response?.status || 500;

    let message = "";
    switch (status) {
      case 404:
        message = "حساب کاربری پیدا نشد";
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
};
