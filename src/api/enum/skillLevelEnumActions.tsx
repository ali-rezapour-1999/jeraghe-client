import api from "@/lib/baseApi";
import { RequestResult } from "@/types/baseType";

export const skillLevelEnumActions = async (): Promise<RequestResult> => {
  const response = await api.get("public/enum/work-experience-levels/");

  if (response.status == 200) {
    return {
      status: response.status,
      success: true,
      result: response.data.data,
    };
  }
  return {
    success: false,
    result: [],
  };

}
