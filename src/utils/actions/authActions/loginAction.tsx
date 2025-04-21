"use server";
import api from "@/utils/lib/api";
import { AuthResult } from "@/utils/type/authStateType";
import { cookies } from "next/headers";

export async function loginAction(
  email: string,
  password: string
): Promise<AuthResult> {
  try {
    const response = await api.post("private/auth/login/", { email, password });
    (await cookies()).set("access_token", response.data.data.access, {
      httpOnly: true,
      secure: true,
      path: "/",
    });
    (await cookies()).set("refresh_token", response.data.data.refresh, {
      httpOnly: true,
      secure: true,
      path: "/",
    });

    (await cookies()).set("slug_id", response.data.data.user.slug_id, {
      httpOnly: true,
      secure: true,
      path: "/",
    });

    if (response.status == 200) {
      return {
        success: true,
        status: response.data.status,
        message: response.data.message,
        data: response.data.data.user,
      };
    }
    return {
      success: false,
      status: response.status,
      message: response.data.error,
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
