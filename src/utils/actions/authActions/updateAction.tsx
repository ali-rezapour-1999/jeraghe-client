"use server";
import api from "@/utils/lib/api";
import { AuthResult } from "@/utils/type/authStateType";
import { cookies } from "next/headers";

export async function updateAction(data: FormData): Promise<AuthResult> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return {
      success: false,
      status: 401,
      message: "توکن دسترسی یافت نشد",
      data: {},
    };
  }

  try {
    const response = await api.patch(`private/auth/update/`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      success: response.status === 200,
      status: response.status,
      message: response.data.message || "عملیات موفقیت‌آمیز بود",
      data: response.data.user || {},
    };
  } catch (error: any) {
    return {
      success: false,
      status: error.response?.status || 500,
      message: error.response?.data?.error || "اعمال تغییرات با خطا مواجه شد",
      data: {},
    };
  }
}
