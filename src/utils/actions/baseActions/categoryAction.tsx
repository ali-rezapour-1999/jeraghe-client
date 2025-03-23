"use server";

import apiGo from "@/utils/lib/apiGo";
import { RequestResult } from "@/utils/type/baseType";
import { PostType } from "@/utils/type/postStateType";

export const categoryListAction = async (): Promise<RequestResult> => {
  const response = await apiGo.get("/base/category-list");
  if (response.status == 200) {
    return {
      success: true,
      data: response.data as PostType,
    };
  }
  return {
    success: false,
    data: {} as PostType,
  };
};
