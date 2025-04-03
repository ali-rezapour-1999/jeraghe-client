"use server";
import api from "@/utils/lib/api";
import { AuthResult } from "@/utils/type/authStateType";
import { cookies } from "next/headers";

export async function registerAction(
  email: string,
  password: string,
  username: string
): Promise<AuthResult> {
  try {
    const response = await api.post("private/auth/register/", {
      email,
      password,
      username,
    });

    (await cookies()).set("access_token", response.data.access, {
      httpOnly: true,
      secure: true,
      path: "/",
    });
    (await cookies()).set("refresh_token", response.data.refresh, {
      httpOnly: true,
      secure: true,
      path: "/",
    });

    if (response.status == 200) {
      return {
        success: true,
        status: response.status,
        message: response.data.message,
        data: response.data,
      };
    }
    return {
      success: false,
      status: response.status,
      message: response.data.error,
      data: response.data,
    };
  } catch (error: any) {
    if (error.response && error.response.data) {
      const errorData = error.response.data;

      return {
        success: false,
        status: error.response.status,
        data: errorData,
        message:
          errorData.message ||
          (errorData.email ? errorData.email[0] : "") ||
          (errorData.username ? errorData.username[0] : "") ||
          "مشکلی در ثبت‌نام پیش آمده است",
      };
    }

    return {
      success: false,
      status: 500,
      message: "خطا در ارتباط با سرور",
    };
  }
}
