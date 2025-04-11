"use server";
import api from "@/utils/lib/api";
import { cookies } from "next/headers";
import { AuthResult } from "@/utils/type/authStateType";
import redis from "@/utils/lib/redis";

export const isAuthCheckAction = async (): Promise<AuthResult> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return { message: "توکن پیدا نشد", success: false };
  }

  const cachedUser = await redis.get(`token:${accessToken}`);
  if (cachedUser) {
    return { success: true };
  }

  try {
    const response = await api.post(
      "private/auth/token-verify/",
      { token: accessToken },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (response.status === 200) {
      await redis.set(
        `token:${accessToken}`,
        JSON.stringify(response.data),
        "EX",
        900,
      );
      return { success: true };
    }

    return { message: "توکن نامعتبر است", success: false };
  } catch (error: any) {
    if (error?.message === "بازیابی توکن با خطا مواجه شد") {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: "احراز هویت انجام نشد، لطفا دوباره وارد شوید",
    };
  }
};
