import { create } from "zustand";
import { categoryListType } from "@/types/baseType";
import { categoryListAction } from "@/lib/api/baseActions/categoryAction";

export const useCategroryState = create<categoryListType>((set) => ({
  categoryData: [],
  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),

  categoryList: async () => {
    set({ isLoading: true });
    const response = await categoryListAction();
    console.log(response);
    if (response != null) {
      if (response.success)
        set({
          categoryData: response.data,
          isLoading: false,
        });
    }
  },
}));
