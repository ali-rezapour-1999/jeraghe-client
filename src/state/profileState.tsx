import { create } from "zustand";
import {
  ProfileState,
  ProfileResponse,
  WorkHistoryResponse,
  RequestResult,
} from "../type/profileStateType";
import { profileRequestAction } from "@/app/api/profileAction/profileRequestAction";
import { workHistoryAction } from "@/app/api/profileAction/workHistoryAction";
import { profileUpdateAction } from "@/app/api/profileAction/profileUpdateAction";
import { workHistoryUpdateAction } from "@/app/api/profileAction/workHistoryUpdateAction";

export const useProfileState = create<ProfileState>((set) => ({
  isLoading: false,
  profileData: null,
  workHistoryData: null,
  setLoading: (isLoading) => set({ isLoading }),

  profileRequest: async () => {
    set({ isLoading: true });
    const response = await profileRequestAction();
    if (response.success)
      set({
        profileData: response.data,
        isLoading: false,
      });
  },

  workHistoryRequest: async () => {
    set({ isLoading: true });
    const respose = await workHistoryAction();
    if (respose.success) {
      set({ workHistoryData: respose.data, isLoading: false });
    }
  },

  profileUpdate: async (data: ProfileResponse): Promise<RequestResult> => {
    set({ isLoading: true });

    const response = await profileUpdateAction(data);
    if (response != null) {
      set({ isLoading: false });
    }
    return { message: response.message };
  },

  workHistoryUpdate: async (
    data: WorkHistoryResponse,
  ): Promise<RequestResult> => {
    set({ isLoading: true });
    const response = await workHistoryUpdateAction(data);
    if (response != null) {
      set({ isLoading: false });
    }
    return { message: response.message };
  },
}));
