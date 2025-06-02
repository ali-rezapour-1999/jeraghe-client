import { create } from "zustand";
import { EnumType } from "@/types/enumType";
import { skillLevelEnumActions } from "@/api/enum/skillLevelEnumActions";

export const useEnumState = create<EnumType>((set) => ({
  enumData: [],
  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),

  skillLevelEnumRequest: async () => {
    set({ isLoading: true });
    const response = await skillLevelEnumActions();
    if (response.success)
      set({
        enumData: response.result,
        isLoading: false,
      });
  },
}));
