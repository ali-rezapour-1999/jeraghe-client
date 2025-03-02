"use server";
import api from "@/lib/baseApi";
import { AuthResult, User } from "@/type/authStateType";
import { cookies } from "next/headers";

export async function updateAction(data: User): Promise<AuthResult> {
  let message = '';
  const slug = (await cookies()).get("user_slug")?.value;
  const token = (await cookies()).get("access_token")?.value;

  try {
    const response = await api.patch(`auth/get/${slug}/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });;
    return {
      success: true,
      status: response.status,
      message: 'تغییرات با موفقیت اعمال شد',
      data: {
        email: response.data.email,
        slug: response.data.slug,
        profile_image: response.data.profile_image,
        username: response.data.username,
        phone_number: response.data.phone_number
      },
    };
  } catch (error) {
    const status =
      (error as { response: { status: number } })?.response?.status || 500;

    switch (status) {
      case 404:
        message = "حساب کاربری پیدا نشد. لطفاً ثبت‌نام کنید.";
        break;
      case 400:
        message = "خطای سرور. لطفاً مجدد تلاش کنید.";
      case 401:
        message =
          "در هنگام اعمال تغییرات با خطا مواجه شدیم لطفا دقایقی دیگر دوباره تلاش کنید";
        break;
      case 500:
        message = "خطای سرور. لطفاً مجدد تلاش کنید.";
        break;
      default:
        message = "خطای ناشناخته";
        break;
    }

    return { success: false, message: message || "تلاش برای دریافت اطلاعات کاربری با خطا مواجه شده" };
  }
}

