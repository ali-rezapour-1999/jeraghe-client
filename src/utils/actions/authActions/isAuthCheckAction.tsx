"use server";
import apiDjango from "@/utils/lib/apiDjango";
import { cookies } from "next/headers";
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL!);

export const isAuthCheckAction = async () => {
  const accessToken = (await cookies()).get("access_token")?.value;
  const refreshToken = (await cookies()).get("refresh_token")?.value;

  if (!accessToken) return null;

  const cachedUser = await redis.get(`user:${accessToken}`);
  if (cachedUser) {
    return JSON.parse(cachedUser);
  }

  try {
    const response = await apiDjango.get(`auth/get`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (response.status !== 200) return null;

    const data = response.data;
    const userData = {
      email: data.email,
      username: data.username,
      phone_number: data.phone_number,
      slug: data.slug_id,
      profile_image: data.profile_image,
    };

    await redis.set(
      `user:${accessToken}`,
      JSON.stringify(userData),
      "EX",
      3600
    );

    return userData;
  } catch (error: any) {
    if (error.response?.status == 401 && refreshToken) {
      try {
        const refreshResponse = await apiDjango.post("auth/token/refresh/", {
          refresh: refreshToken,
        });

        if (refreshResponse.status === 200) {
          const newAccessToken = refreshResponse.data.access;

          (await cookies()).set("access_token", newAccessToken, {
            httpOnly: true,
            secure: true,
            path: "/",
          });

          const response = await apiDjango.get("auth/get", {
            headers: { Authorization: `Bearer ${newAccessToken}` },
          });

          if (response.status === 200) {
            const userData = response.data;
            await redis.set(
              `user:${newAccessToken}`,
              JSON.stringify(userData),
              "EX",
              3600
            );
            return userData;
          }
        }
      } catch {
        (await cookies()).delete("access_token");
        (await cookies()).delete("refresh_token");
      }
    }
  }
};
