"use server";
import api from "@/utils/lib/api";
import { cookies } from "next/headers";
import { AuthResult } from "@/utils/type/authStateType";
import redis from "@/utils/lib/redis";

export const isAuthCheckAction = async (): Promise<AuthResult> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;
  let IsRunRefreshTokne;

  if (!accessToken && !refreshToken) {
    return { message: "توکن پیدا نشد", success: false };
  }

  if (accessToken) {
    const cachedUser = await redis.get(`token:${accessToken}`);
    if (cachedUser) {
      return { success: true };
    }

    try {
      const response = await api.post(
        "private/auth/token-verify/",
        JSON.stringify({ token: accessToken }),
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
          3600,
        );
        return { success: true };
      } else {
        IsRunRefreshTokne = true;
      }
    } catch {
      IsRunRefreshTokne = true;
      return { message: "توکن نامعتبر است", success: false };
    }
  }

  if (refreshToken || IsRunRefreshTokne) {
    try {
      const refreshResponse = await api.post(
        "private/auth/token-refresh/",
        JSON.stringify({ refresh: refreshToken }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (refreshResponse.status === 200) {
        const newAccessToken = refreshResponse.data.access;
        const newRefreshToken = refreshResponse.data.refresh;
        try {
          const retryResponse = await api.post(
            "private/auth/token-verify/",
            JSON.stringify({ token: newAccessToken }),
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
          );

          if (retryResponse.status === 200) {
            cookieStore.set("refresh_token", newRefreshToken, {
              httpOnly: true,
              secure: true,
              path: "/",
            });
            cookieStore.set("access_token", newAccessToken, {
              httpOnly: true,
              secure: true,
              path: "/",
            });
            await redis.set(
              `token:${newAccessToken}`,
              JSON.stringify(retryResponse.data),
              "EX",
              3600,
            );
            return {
              success: true,
            };
          }
        } catch {
          cookieStore.delete("access_token");
          cookieStore.delete("refresh_token");
          return {
            success: false,
            message: "بازیابی توکن با خطا مواجه شد",
          };
        }
      }
    } catch {
      cookieStore.delete("access_token");
      cookieStore.delete("refresh_token");
      return {
        success: false,
        message: "بازیابی توکن با خطا مواجه شد",
      };
    }
  }
  return {
    success: false,
    message: "احراز هویت انجام نشد، لطفا دوباره وارد شوید",
  };
};
