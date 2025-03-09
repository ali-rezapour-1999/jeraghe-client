"use server";
import apiDjango from "@/lib/apiDjango";
import { AuthResult } from "@/type/authStateType";
import { cookies } from "next/headers";

export async function loginAction(email: string, password: string): Promise<AuthResult> {
  let message = '';

  try {
    const response = await apiDjango.post("auth/login/", { email, password });
    (await cookies()).set("access_token", response.data.access, { httpOnly: true, secure: true, path: "/" });
    (await cookies()).set("refresh_token", response.data.refresh, { httpOnly: true, secure: true, path: "/" });
    (await cookies()).set("user_slug", response.data.user.slug, { httpOnly: true, secure: true, path: "/" });

    return {
      success: true,
      status: response.status,
      message: 'خوش آمدید',
      data: response.data,
    };
  } catch (error) {
    const status =
      (error as { response: { status: number } })?.response?.status || 500;

    switch (status) {
      case 404:
        message =
          "حساب کابری با این ایمیل پیدا نکردم.میتونی بخش ثبت نام و امتحان کنی.";
        break;
      case 400:
        message = "در خواست نا معتبر";
        break;
      case 401:
        message = "رمز عبور نادرست است";
        break;
      case 500:
        message = "خطای سرور. لطفا مجدد تلاش کنید.";
        break;
      default:
        message = "خطای ناشناخته";
        break;
    }
    return { success: false, message: message || "تلاش برای ورود با خطا مواجه شده" };
  }
}

