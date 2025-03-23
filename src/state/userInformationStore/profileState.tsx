import { create } from "zustand";

import { ProfileResponse, ProfileState } from "@/utils/type/profileStateType";
import { RequestResult } from "@/utils/type/baseType";
import {
  profileRequestAction,
  profileUpdateAction,
} from "@/utils/actions/userInformationActions";

export const useProfileState = create<ProfileState>((set) => ({
  isLoading: false,
  profileData: null,
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

  profileUpdate: async (data: ProfileResponse): Promise<RequestResult> => {
    set({ isLoading: true });

    const response = await profileUpdateAction(data);
    if (response != null) {
      set({ isLoading: false });
    }
    return { message: response.message, success: response.success };
  },
}));
