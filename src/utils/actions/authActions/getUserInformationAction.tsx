"use server";
import apiDjango from "@/utils/lib/apiDjango";
import { cookies } from "next/headers";
import Redis from "ioredis";
import redis from "@/utils/lib/redis";
import { AuthResult } from "@/utils/type/authStateType";

export const getUserInformationAction = async (): Promise<AuthResult> => {
  const accessToken = (await cookies()).get("access_token")?.value;

  if (!accessToken) return { success: false, message: "توکن یافت نشد" };

  const cachedUser = await redis.get(`token:${accessToken}`);
  if (cachedUser) {
    return JSON.parse(cachedUser);
  }

  try {
    const response = await apiDjango.get(`auth/get`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (response.status !== 200)
      return {
        success: false,
        status: response.status,
        message: response.data.error,
      };

    const data = response.data;
    const userData = {
      email: data.email,
      username: data.username,
      phone_number: data.phone_number,
      slug: data.slug_id,
      profile_image: data.profile_image,
    };

    await redis.set(
      `token:${accessToken}`,
      JSON.stringify(userData),
      "EX",
      3600
    );

    return {
      success: true,
      status: response.status,
      data: userData,
      message: response.data.message,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error,
    };
  }
};
