import { create } from "zustand";
import { SkillItemType, SkillState } from "@/types/profileStateType";
import { RequestResult } from "@/types/baseType";
import { DeleteSkillItem, GetSkillItem, SkillItemAction, SkillItemListAction, UserSkillsAction, UserSkillsRequestAction } from "@/api/userInformationActions/userSkillAction";
export const useSkillState = create<SkillState>((set) => ({
  isLoading: false,
  skillData: null,
  getItemData: null,
  skillItemListData: [],
  setLoading: (isLoading) => set({ isLoading }),
  setItemNull: () => set({ getItemData: null }),

  skillRequest: async () => {
    set({ isLoading: true });
    const response = await UserSkillsRequestAction();
    if (response != null) set({ isLoading: false });
    if (response.success)
      set({ skillData: response.result.data, isLoading: false });
  },

  createSkill: async ({ title, profile, category, }: {
    title: string;
    profile: number;
    category: number;
  }): Promise<RequestResult> => {
    set({ isLoading: true });
    const response = await UserSkillsAction({ title, profile, category });
    if (response != null) set({ isLoading: false });
    return { message: response.message, success: response.success };
  },

  skillItemCreate: async ({ skill, profile, level, id, skill_id }: SkillItemType): Promise<RequestResult> => {
    set({ isLoading: true });
    const response = await SkillItemAction({ skill, profile, level, id, skill_id });
    if (response != null) set({ isLoading: false });
    return { message: response.message, success: response.success };
  },

  skillItemListRequest: async () => {
    set({ isLoading: true });
    const response = await SkillItemListAction()
    if (response != null) {
      set({ skillItemListData: response.result, isLoading: false });
    }
  },

  getSkillItem: async (ID: number): Promise<RequestResult> => {
    const response = await GetSkillItem({ ID })
    if (response != null) {
      set({ getItemData: response.result, isLoading: false });
      return { success: response.success };
    }
    return { success: false };
  },

  skillItemDelete: async (id: number): Promise<RequestResult> => {
    const response = await DeleteSkillItem({ id })
    console.log(response)
    if (response != null) {
      return { success: response.success, message: response.message };
    }
    return { success: false };
  }
}));

