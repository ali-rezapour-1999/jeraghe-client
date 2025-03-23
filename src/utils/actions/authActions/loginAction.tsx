"use server";
import apiDjango from "@/utils/lib/apiDjango";
import { AuthResult } from "@/utils/type/authStateType";
import { cookies } from "next/headers";

export async function loginAction(
  email: string,
  password: string
): Promise<AuthResult> {
  try {
    const response = await apiDjango.post("auth/login/", { email, password });
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
          "مشکلی در ورود پیش آمده است",
      };
    }

    return {
      success: false,
      status: 500,
      message: "خطا در ارتباط با سرور",
    };
  }
}
