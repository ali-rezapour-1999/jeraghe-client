"use server";

import api from "@/utils/lib/api";
import { WorkHistoryResponse } from "@/utils/type/profileStateType";
import { cookies } from "next/headers";

export const workHistoryUpdateAction = async (data: WorkHistoryResponse) => {
  const slug = (await cookies()).get("slug_user")?.value;

  if (!slug) {
    return {
      success: false,
      status: 400,
      message: "شناسه کاربر یافت نشد.",
    };
  }
  try {
    const response = await api.patch<WorkHistoryResponse>(
      `/private/profile/work-history/${slug}/`,
      data
    );

    if (response.status == 200 || response.status == 201) {
      return {
        success: true,
        status: response.status,
        message: "تغییر شما ثبت شده",
      };
    } else {
      return {
        success: false,
        status: response.status,
        message: "مشکلی در ارسال اطلاعت وجود داره لطفا مجدد امتحان کنید",
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
