"use server";

import api from "@/utils/lib/api";
import { RequestResult } from "@/utils/type/baseType";
import redis from "@/utils/lib/redis";

export const categoryListAction = async (): Promise<RequestResult> => {
  const data = await redis.get("category");
  if (data) {
    return { success: true, data: JSON.parse(data) };
  }

  const response = await api.get("/pubilc/category/");

  if (response.status == 200) {
    return {
      status: response.status,
      success: true,
      data: response.data,
    };
  }
  return {
    success: false,
    data: {},
  };
};
