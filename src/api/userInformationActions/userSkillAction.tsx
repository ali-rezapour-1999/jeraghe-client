"use server";
import api from "@/lib/baseApi";
import { RequestResult } from "@/types/baseType";
import { SkillItemType } from "@/types/profileStateType";
import { cookies } from "next/headers";

export const UserSkillsAction = async ({ title, profile, category }: { title: string, profile: number, category: number }): Promise<RequestResult> => {
  const data = {
    title,
    profile,
    category
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
      result: response.data.data,
      success: true,
      message: response.data.message
    };
  } catch (error: any) {
    if (error.response && error.response.data) {
      const errorData = error.response.data;

      return {
        success: false,
        result: errorData,
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
      result: response.data,
      success: true,
    };
  } catch (error: any) {
    return {
      result: {},
      success: false,
      message: error.response.data.message,
    };
  }
};




export const SkillItemAction = async ({ skill, profile, level, id, skill_id }: SkillItemType): Promise<RequestResult> => {
  const accessToken = (await cookies()).get("access_token")?.value;
  if (!accessToken) {
    return {
      success: false,
      status: 400,
      message: "شناسه کاربر یافت نشد.",
    };
  }

  try {
    const data = { skill, profile, level, id, skill_id };
    const response = await api.post(`private/profile/skill-item/`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return {
      result: response.data.data,
      success: true,
      message: response.data.message
    };
  } catch (error: any) {
    if (error.response && error.response.data) {
      const errorData = error.response.data;

      return {
        success: false,
        result: errorData,
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



export const SkillItemListAction = async (): Promise<RequestResult> => {
  const accessToken = (await cookies()).get("access_token")?.value;
  if (!accessToken) {
    return {
      success: false,
      status: 400,
      message: "شناسه کاربر یافت نشد.",
    };
  }

  try {
    const response = await api.get(`public/get-profile-skill-items/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return {
      result: response.data.data,
      success: true,
      message: response.data.message
    };
  } catch (error: any) {
    if (error.response && error.response.data) {
      const errorData = error.response.data;

      return {
        success: false,
        result: errorData,
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


export const GetSkillItem = async ({ ID }: { ID: number }): Promise<RequestResult> => {
  const accessToken = (await cookies()).get("access_token")?.value;
  if (!accessToken) {
    return {
      success: false,
      status: 400,
      message: "شناسه کاربر یافت نشد.",
    };
  }

  try {
    const response = await api.post(`public/get-profile-skill-item/`, { ID }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return {
      result: response.data.data,
      success: true,
      message: response.data.message
    };
  } catch (error: any) {
    if (error.response && error.response.data) {
      const errorData = error.response.data;

      return {
        success: false,
        result: errorData,
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

export const DeleteSkillItem = async ({ id }: { id: number }): Promise<RequestResult> => {
  const accessToken = (await cookies()).get("access_token")?.value;
  if (!accessToken) {
    return {
      success: false,
      status: 400,
      message: "شناسه کاربر یافت نشد.",
    };
  }

  try {
    const response = await api.delete(`private/profile/skill-item/${id}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return {
      success: true,
      message: response.data.message
    };
  } catch (error: any) {
    if (error.response && error.response.data) {
      const errorData = error.response.data;

      return {
        success: false,
        result: errorData,
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
