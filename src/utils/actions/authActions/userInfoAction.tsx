"use server";
import apiDjango from "@/utils/lib/apiDjango";
import { AuthResult } from "@/utils/type/authStateType";
import { cookies } from "next/headers";

export async function userInfoAction(): Promise<AuthResult> {
  const accessToken = (await cookies()).get("access_token")?.value;

  const response = await apiDjango.get(`auth/get`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.status == 200) {
    return {
      data: {
        email: response.data.email,
        username: response.data.username,
        phone_number: response.data.phone_number,
        slug: response.data.slug,
        image: response.data.image,
      },
    };
  }
  return {
    data: response.data,
    message: response.data.error,
  };
}
