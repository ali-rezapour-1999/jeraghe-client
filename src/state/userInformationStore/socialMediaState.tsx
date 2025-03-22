import { create } from "zustand";
import { SocialMediaResponse, SocialMediaState } from "@/type/profileStateType";
import { RequestResult } from "@/type/baseType";
import {
  socialMediaAction,
  socialMediaCreateAction,
  socialMediaDeleteAction,
} from "@/utils/actions/userInformationActions";
export const useSocialMediaState = create<SocialMediaState>((set) => ({
  isLoading: false,
  socialMediaData: null,
  setLoading: (isLoading) => set({ isLoading }),

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
