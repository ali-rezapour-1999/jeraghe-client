"use server";
import { cookies } from "next/headers";

export async function logoutAction() {
    (await cookies()).delete("access_token");
    (await cookies()).delete("refresh_token");
    (await cookies()).delete("user_slug");
    return { success: true , message:'از حساب کاربری خود خارج شدید' };
  }
  