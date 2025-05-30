import { create } from "zustand";
import {
  SkillState,
} from "@/types/profileStateType";
import { RequestResult } from "@/types/baseType";
import { UserSkillsAction, UserSkillsRequestAction } from "@/lib/api/userInformationActions/userSkillAction";
export const useSkillState = create<SkillState>((set) => ({
  isLoading: false,
  skillData: null,
  setLoading: (isLoading) => set({ isLoading }),

  skillRequest: async () => {
    set({ isLoading: true });
    const response = await UserSkillsRequestAction();
    if (response != null) set({ isLoading: false });
    if (response.success)
      set({ skillData: response.data.data, isLoading: false });
  },

  createSkill: async ({ title, profile }: { title: string, profile: number }): Promise<RequestResult> => {
    set({ isLoading: true });
    const response = await UserSkillsAction({ title, profile });
    if (response != null) set({ isLoading: false });
    return { message: response.message, success: response.success };
  },
}));
