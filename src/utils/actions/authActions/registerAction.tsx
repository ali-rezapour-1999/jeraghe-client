"use server";
import apiDjango from "@/lib/apiDjango";
import { AuthResult } from "@/type/authStateType";
import { cookies } from "next/headers";

export async function registerAction(
  email: string,
  password: string,
  username: string
): Promise<AuthResult> {
  const response = await apiDjango.post("auth/register/", {
    email,
    password,
    username,
  });

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

  if (response.status == 201) {
    return {
      success: true,
      status: response.status,
      data: response.data,
      message: response.data.message,
    };
  } else {
    return {
      success: false,
      status: response.status,
      data: response.data,
      message: response.data.error,
    };
  }
}
