"use server";

import apiGo from "@/utils/lib/apiGo";
import redis from "@/utils/lib/redis";
import { RequestResult } from "@/utils/type/baseType";

export const categoryListAction = async (): Promise<RequestResult> => {
  const category = await redis.get(`::base/category/`);
  if (category) {
    return { data: JSON.parse(category), success: true };
  }
  const response = await apiGo.get("base/category");

  if (response.status == 200) {
    await redis.set(
      `::base/category/`,
      JSON.stringify(response.data),
      "EX",
      10000
    );
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
