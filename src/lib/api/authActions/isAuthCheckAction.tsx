"use server";
import api from "@/lib/baseApi";
import { cookies } from "next/headers";
import { AuthResult } from "@/types/authStateType";
import redis from "@/lib/redis";

export const isAuthCheckAction = async (): Promise<AuthResult> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

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
        "/private/auth/token-verify/",
        JSON.stringify({ token: accessToken }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        await redis.set(
          `token:${accessToken}`,
          JSON.stringify(response.data),
          "EX",
          3600
        );
        return { success: true };
      } else {
      }
    } catch {
      try {
        const refreshResponse = await api.post(
          "private/auth/token-refresh/",
          JSON.stringify({ refresh: refreshToken }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (refreshResponse.status == 200) {
          const newAccessToken = refreshResponse.data.data.access;
          const newRefreshToken = refreshResponse.data.data.refresh;
          try {
            const retryResponse = await api.post(
              "private/auth/token-verify/",
              JSON.stringify({ token: newAccessToken }),
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            if (retryResponse.status == 200) {
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
                3600
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
        cookieStore.delete("user_id");
        return {
          success: false,
          message: "بازیابی توکن با خطا مواجه شد",
        };
      }
    }
  }

  return {
    success: false,
    message: "احراز هویت انجام نشد، لطفا دوباره وارد شوید",
  };
};
