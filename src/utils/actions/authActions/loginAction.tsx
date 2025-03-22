"use server";
import apiDjango from "@/lib/apiDjango";
import { AuthResult } from "@/type/authStateType";
import { cookies } from "next/headers";

export async function loginAction(
  email: string,
  password: string
): Promise<AuthResult> {
  const response = await apiDjango.post("auth/login/", { email, password });
  (await cookies()).set("access_token", response.data.access, {
    httpOnly: true,
    secure: true,
    path: "/",
  });
  (await cookies()).set("refresh_token", response.data.refresh, {
    httpOnly: true,
    secure: true,
    path: "/",
  });

  if (response.status == 200) {
    return {
      success: true,
      status: response.status,
      message: response.data.message,
      data: response.data,
    };
  }
  return {
    success: false,
    status: response.status,
    message: response.data.error,
    data: response.data,
  };
}
