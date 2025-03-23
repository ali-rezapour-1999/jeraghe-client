"use server";
import apiDjango from "@/lib/apiDjango";
import { cookies } from "next/headers";

export const isAuthCheckAction = async () => {
  const accessToken = (await cookies()).get("access_token")?.value;

  if (!accessToken) return null;
  const response = await apiDjango.get(`auth/get`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200) return null;

  const data = await response.data;
  return {
    email: data.email,
    username: data.username,
    phone_number: data.phone_number,
    slug: data.slug_id,
    profile_image: data.profile_image,
  };
};
