"use server";
import api from "@/lib/baseApi";
import { ProfileResponse, RequestResult } from "@/type/profileStateType";
import { cookies } from "next/headers";

export const profileUpdateAction = async (
  data: ProfileResponse,
): Promise<RequestResult> => {
  const slug = (await cookies()).get("user_slug")?.value;

  if (!slug) {
    return {
      success: false,
      status: 400,
      message: "شناسه کاربر یافت نشد.",
    };
  }
  try {
    const response = await api.patch<ProfileResponse>(
      `/profile/profiles/${slug}/`,
      data,
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
