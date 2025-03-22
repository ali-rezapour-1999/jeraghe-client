"use server";
import apiDjango from "@/lib/apiDjango";
import { AuthResult, User } from "@/type/authStateType";
import { cookies } from "next/headers";

export async function updateAction(data: User): Promise<AuthResult> {
  const token = (await cookies()).get("access_token")?.value;

  const response = await apiDjango.patch(`auth/update/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status == 200) {
    return {
      success: true,
      status: response.status,
      message: response.data.message,
      data: {
        email: response.data.email,
        slug: response.data.slug,
        profile_image: response.data.profile_image,
        username: response.data.username,
        phone_number: response.data.phone_number,
      },
    };
  }
  return {
    success: false,
    status: response.status,
    message: response.data.error,
    data: response.data,
  };
}
