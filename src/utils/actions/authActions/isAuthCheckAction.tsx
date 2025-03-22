"use server";
import apiDjango from "@/lib/apiDjango";
import { cookies } from "next/headers";

export const isAuthCheckAction = async () => {
  const accessToken = (await cookies()).get("access_token")?.value;
  const slug = (await cookies()).get("user_slug")?.value;

  if (!slug) return null;
  const response = await apiDjango.get(`auth/get/${slug}`, {
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
}

