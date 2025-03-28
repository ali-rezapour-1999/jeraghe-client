"use server";
import apiDjango from "@/utils/lib/apiDjango";
import { cookies } from "next/headers";
import { AuthResult } from "@/utils/type/authStateType";
import redis from "@/utils/lib/redis";

export const isAuthCheckAction = async (): Promise<AuthResult> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!accessToken) {
    return { message: "توکن پیدا نشد", success: false };
  }

  const cachedUser = await redis.get(`token:${accessToken}`);
  if (cachedUser) {
    return JSON.parse(cachedUser);
  }

  try {
    const response = await apiDjango.get("auth/get", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (response.status === 200) {
      const userData = response.data.data;

      const authResult: AuthResult = {
        success: true,
        status: response.status,
        data: userData,
        message: response.data.message,
      };

      await redis.set(
        `token:${accessToken}`,
        JSON.stringify(authResult),
        "EX",
        3600,
      );

      return authResult;
    }

    return {
      success: false,
      status: response.status,
      message: response.data?.error || "خطا در دریافت اطلاعات",
    };
  } catch (error: any) {
    if (error.response?.status === 401 && refreshToken) {
      try {
        const refreshResponse = await apiDjango.post("auth/token-refresh/", {
          refresh: refreshToken,
        });

        if (refreshResponse.status === 200) {
          const newAccessToken = refreshResponse.data.access;

          cookieStore.set("access_token", newAccessToken, {
            httpOnly: true,
            path: "/",
            maxAge: 3600,
          });

          const retryResponse = await apiDjango.get("auth/get", {
            headers: { Authorization: `Bearer ${newAccessToken}` },
          });

          if (retryResponse.status === 200) {
            const userData = retryResponse.data.data;

            const authResult: AuthResult = {
              success: true,
              status: retryResponse.status,
              data: userData,
              message: retryResponse.data.message,
            };

            await redis.set(
              `token:${newAccessToken}`,
              JSON.stringify(authResult),
              "EX",
              3600,
            );

            return authResult;
          }
        }
        return {
          success: false,
          message: "خطا در دریافت اطلاعات پس از بازیابی توکن",
        };
      } catch {
        cookieStore.delete("access_token");
        cookieStore.delete("refresh_token");
        return {
          success: false,
          message: "انجام عملیات بازیابی توکن با خطا مواجه شد",
        };
      }
    }

    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");
    return {
      success: false,
      message: error.response?.data?.error || "خطا در احراز هویت",
    };
  }
};
