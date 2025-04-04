"use server";
import api from "@/utils/lib/api";
import { AuthResult } from "@/utils/type/authStateType";
import { cookies } from "next/headers";

export async function userInfoAction(): Promise<AuthResult> {
  const accessToken = (await cookies()).get("access_token")?.value;
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
