import { create } from "zustand";
import { categoryListType } from "@/types/baseType";
import { categoryListAction } from "@/api/baseActions/categoryAction";

export const useCategroryState = create<categoryListType>((set) => ({
  categoryData: [],
  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),

  categoryList: async () => {
    set({ isLoading: true });
    const response = await categoryListAction();
    if (response != null) {
      if (response.success)
        set({
          categoryData: response.result.data,
          isLoading: false,
        });
    }
  },
}));
