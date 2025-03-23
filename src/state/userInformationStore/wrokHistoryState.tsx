import { create } from "zustand";
import {
  WorkHistoryResponse,
  WorkHistoryState,
} from "@/utils/type/profileStateType";
import { RequestResult } from "@/utils/type/baseType";
import {
  workHistoryAction,
  workHistoryUpdateAction,
} from "@/utils/actions/userInformationActions";

export const useWorkHistoryState = create<WorkHistoryState>((set) => ({
  isLoading: false,
  workHistoryData: null,
  setLoading: (isLoading) => set({ isLoading }),

  workHistoryRequest: async () => {
    set({ isLoading: true });
    const respose = await workHistoryAction();
    if (respose.success) {
      set({ workHistoryData: respose.data, isLoading: false });
    }
  },

  workHistoryUpdate: async (
    data: WorkHistoryResponse
  ): Promise<RequestResult> => {
    set({ isLoading: true });
    const response = await workHistoryUpdateAction(data);
    if (response != null) {
      set({ isLoading: false });
    }
    return { message: response.message, success: response.success };
  },
}));
