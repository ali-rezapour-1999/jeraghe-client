"use server";
import apiDjango from "@/lib/apiDjango";
import { AuthResult } from "@/type/authStateType";
import { cookies } from "next/headers";

export async function registerAction(email: string, password: string, username: string): Promise<AuthResult> {
  let message = "";

  try {
    const response = await apiDjango.post("/api/auth/register/", { email, password, username });

    (await cookies()).set("access_token", response.data.access, { httpOnly: true, secure: true, path: "/" });
    (await cookies()).set("refresh_token", response.data.refresh, { httpOnly: true, secure: true, path: "/" });
    (await cookies()).set("user_slug", response.data.user.slug, { httpOnly: true, secure: true, path: "/" });

    return {
      success: true,
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    const status =
      (error as { response: { status: number } })?.response?.status || 500;

    switch (status) {
      case 400:
        message = "با این ایمیل حساب کاربری دارید لطفا از بخش ورود امتحان کنید";
        break;
      case 409:
        message = "با این ایمیل حساب کاربری دارید لطفا از بخش ورود امتحان کنید";
        break;
      case 500:
        message = "خطای سرور. لطفا مجدد تلاش کنید";
        break;
      default:
        message = "خطای ناشناخته";
        break;
    }
    return { success: false, message: message || "مشکل در سرور، دوباره تلاش کنید" };
  }
}
