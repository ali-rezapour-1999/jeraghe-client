"use server";
import apiDjango from "@/utils/lib/apiDjango";
import { cookies } from "next/headers";
import { AuthResult } from "@/utils/type/authStateType";
import redis from "@/utils/lib/redis";

export const isAuthCheckAction = async (): Promise<AuthResult> => {
  const accessToken = (await cookies()).get("access_token")?.value;
  const refreshToken = (await cookies()).get("refresh_token")?.value;

  if (!accessToken) return { message: "توکن پیدا نشد", success: false };

  const cachedUser = await redis.get(`token:${accessToken}`);
  if (cachedUser) {
    return { data: JSON.parse(cachedUser), success: true };
  }

  try {
    const response = await apiDjango.get(`auth/token-verify`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (response.status === 200) {
      await redis.set(
        `token:${accessToken}`,
        JSON.stringify(response.data),
        "EX",
        1800
      );

      return { success: true, status: response.status, data: response.data };
    }

    return {
      message: "در دریافت اطلاعات با خطا مواجه شدیم",
      success: false,
      status: response.status,
    };
  } catch (error: any) {
    if (error.response?.status === 401 && refreshToken) {
      try {
        const refreshResponse = await apiDjango.post("auth/token-refresh/", {
          refresh: refreshToken,
        });

        if (refreshResponse.status === 200) {
          const newAccessToken = refreshResponse.data.access;

          (await cookies()).set("access_token", newAccessToken, {
            httpOnly: true,
            secure: true,
            path: "/",
          });

          const userResponse = await apiDjango.get("auth/token-verify/", {
            headers: { Authorization: `Bearer ${newAccessToken}` },
          });

          if (userResponse.status === 200) {
            await redis.set(
              `token:${newAccessToken}`,
              JSON.stringify(userResponse.data),
              "EX",
              1800
            );

            return {
              success: true,
              status: userResponse.status,
              data: userResponse.data,
            };
          }
        }
      } catch (error) {
        (await cookies()).delete("access_token");
        (await cookies()).delete("refresh_token");
        return {
          message: "انجام عملیات بازیابی توکن با خطا مواجه شد",
          success: false,
        };
      }
    }
  }
  (await cookies()).delete("access_token");
  (await cookies()).delete("refresh_token");
  return {
    message: "توکن نامعتبر است یا عملیات با خطا مواجه شد",
    success: false,
  };
};
