"use server";
import { cookies } from "next/headers";
import redis from "@/lib/redis";

export async function logoutAction() {
  const accessToken = (await cookies()).get("access_token")?.value;
  try {
    if (accessToken) {
      await redis.del(`user:${accessToken}`);
      (await cookies()).delete("access_token");
      (await cookies()).delete("refresh_token");
      return { success: true, message: "از حساب کاربری خود خارج شدید" };
    }
  } catch (error) {
    return { success: false, message: error };
  }
}
