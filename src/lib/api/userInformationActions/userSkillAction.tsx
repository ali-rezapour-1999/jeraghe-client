"use server";
import api from "@/lib/baseApi";
import { RequestResult } from "@/types/baseType";
import { cookies } from "next/headers";

export const UserSkillsAction = async ({ title, profile }: { title: string, profile: number }): Promise<RequestResult> => {
  const data = {
    title,
    profile,
  };
  const accessToken = (await cookies()).get("access_token")?.value;
  if (!accessToken) {
    return {
      success: false,
      status: 400,
      message: "شناسه کاربر یافت نشد.",
    };
  }

  try {
    const response = await api.post(`private/profile/user-skill/`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return {
      data: response.data.data,
      success: true,
      message: response.data.message
    };
  } catch (error: any) {
    if (error.response && error.response.data) {
      const errorData = error.response.data;

      return {
        success: false,
        data: errorData,
        message:
          errorData.message ||
          (errorData.email ? errorData.email[0] : "") ||
          "مشکلی در ورود پیش آمده است",
      };
    };
  }
  return {
    success: false,
    status: 500,
    message: "خطا در ارتباط با سرور",
  };

}



export const UserSkillsRequestAction = async (): Promise<RequestResult> => {
  const accessToken = (await cookies()).get("access_token")?.value;
  if (!accessToken) {
    return {
      success: false,
      status: 400,
      message: "شناسه کاربر یافت نشد.",
    };
  }

  try {
    const response = await api.get(`public/get-profile-skill/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return {
      data: response.data,
      success: true,
    };
  } catch (error: any) {
    return {
      data: {},
      success: false,
      message: error.response.data.message,
    };
  }
};


