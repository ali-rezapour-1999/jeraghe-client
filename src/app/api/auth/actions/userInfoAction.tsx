"use server";
import apiDjango from "@/lib/apiDjango";
import { AuthResult } from "@/type/authStateType";
import { cookies } from "next/headers";

export async function userInfoAction(): Promise<AuthResult> {
  let message = "";
  const accessToken = (await cookies()).get("access_token")?.value;
  const slug = (await cookies()).get("user_slug")?.value;
  try {
    const response = await apiDjango.get(`auth/get/${slug}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.data
    return {
      data: {
        email: data.email,
        username: data.username,
        phone_number: data.phone_number,
        slug: data.slug,
        profile_image: data.profile_image,
      }
    };

  } catch (error) {
    const status =
      (error as { response: { status: number } })?.response?.status || 500;

    switch (status) {
      case 401:
        message = "کد احراض هویت شما منقضی شده از بخش ورود دوباره تلاش کنید";
        break;
      case 404:
        message = "کاربر مورد نظر یافت نشد";
        break;
      case 500:
        message = "مشکل در برقراری ارتباط به سرور";
        break;
      default:
        message = "خطای ناشناخته دوباره سعی در تلاش دوباره";
        break;
    }
    return { success: false, message: message || "مشکل در سرور، دوباره تلاش کنید" };
  }
}
