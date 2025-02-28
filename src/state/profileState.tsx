import { create } from "zustand";
import {
  ProfileState,
  ProfileResponse,
  WorkHistoryResponse,
  SocialMediaResponse,
} from "../type/profileStateType";
import { RequestResult } from "@/type/mainType";
import { profileRequestAction } from "@/app/api/profileAction/profileRequestAction";
import { workHistoryAction } from "@/app/api/profileAction/workHistoryAction";
import { profileUpdateAction } from "@/app/api/profileAction/profileUpdateAction";
import { workHistoryUpdateAction } from "@/app/api/profileAction/workHistoryUpdateAction";
import { socialMediaCreateAction } from "@/app/api/profileAction/socialMediaCreateAction";
import { socialMediaAction } from "@/app/api/profileAction/socialMediaAction";
import { socialMediaDeleteAction } from "@/app/api/profileAction/socialMediaDelete";

export const useProfileState = create<ProfileState>((set) => ({
  isLoading: false,
  profileData: null,
  workHistoryData: null,
  socialMediaData: null,
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
    return { message: response.message, success: response.success };
  },

  workHistoryUpdate: async (
    data: WorkHistoryResponse,
  ): Promise<RequestResult> => {
    set({ isLoading: true });
    const response = await workHistoryUpdateAction(data);
    if (response != null) {
      set({ isLoading: false });
    }
    return { message: response.message, success: response.success };
  },

  socialMediaRequest: async () => {
    set({ isLoading: true });
    const response = await socialMediaAction();
    if (response.success)
      set({ socialMediaData: response.data, isLoading: false });
  },

  socialMedia: async (data: SocialMediaResponse): Promise<RequestResult> => {
    set({ isLoading: true });
    const response = await socialMediaCreateAction(data);
    if (response != null) set({ isLoading: false });
    return { message: response.message, success: response.success };
  },

  socialMediaDelete: async (slug: string): Promise<RequestResult> => {
    set({ isLoading: true });
    const response = await socialMediaDeleteAction(slug);
    if (response.success) set({ isLoading: false });
    return { message: response.message, success: response.success };
  },
}));
