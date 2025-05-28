"use server";

import api from "@/lib/baseApi";
import { RequestResult } from "@/types/baseType";
import redis from "@/lib/redis";

export const categoryListAction = async (): Promise<RequestResult> => {
  const data = await redis.get("category");
  if (data) {
    return { success: true, data: JSON.parse(data) };
  }

  const response = await api.get("public/category/");

  if (response.status == 200) {
    return {
      status: response.status,
      success: true,
      data: response.data,
    };
  }
  return {
    success: false,
    data: null,
  };
};
