"use server";

import api from "@/lib/baseApi";
import { RequestResult } from "@/types/baseType";

export const categoryListAction = async (): Promise<RequestResult> => {
  const response = await api.get("public/category/");

  if (response.status == 200) {
    return {
      status: response.status,
      success: true,
      result: response.data,
    };
  }
  return {
    success: false,
    result: {},
  };
};
