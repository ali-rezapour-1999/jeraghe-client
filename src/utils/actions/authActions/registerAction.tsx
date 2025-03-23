"use server";
import apiDjango from "@/lib/apiDjango";
import { AuthResult } from "@/type/authStateType";
import { cookies } from "next/headers";

export async function registerAction(
  email: string,
  password: string,
  username: string
): Promise<AuthResult> {
  try {
    const response = await apiDjango.post("auth/register/", {
      email,
      password,
      username,
    });

    if (response.status === 201) {
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

      return {
        success: true,
        status: response.status,
        data: response.data,
        message: response.data.message,
      };
    } else {
      return {
        success: false,
        status: response.status,
        data: response.data,
        message: response.data.error || "مشکلی پیش آمده است",
      };
    }
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
