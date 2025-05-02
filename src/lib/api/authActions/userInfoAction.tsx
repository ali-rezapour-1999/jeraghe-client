"use server";
import api from "@/lib/baseApi";
import { AuthResult } from "@/types/authStateType";
import { cookies } from "next/headers";

export async function userInfoAction(): Promise<AuthResult> {
  const accessToken = (await cookies()).get("access_token")?.value;
  const slug = (await cookies()).get("user_id")?.value;
  if (!accessToken) {
    return { message: "توکن پیدا نشد", success: false };
  }

  try {
    const response = await api.get(`private/auth/get`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.status == 200) {
      if (!slug) {
        (await cookies()).set("user_id", response.data.data.slug_id, {
          httpOnly: true,
          secure: true,
          path: "/",
        });
      }
      return {
        success: true,
        data: response.data.data,
      };
    }
    return {
      success: false,
      message: response.data.error,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error,
    };
  }
}
