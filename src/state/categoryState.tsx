import { create } from "zustand";
import { categoryListType } from "@/utils/type/baseType";
// import { categoryListAction } from "@/utils/actions/baseActions/categoryAction";

export const useCategroryState = create<categoryListType>((set) => ({
  categoryData: [],
  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),

  categoryList: async () => {
    // set({ isLoading: true });
    // const response = await categoryListAction();
    // if (response.success)
    //   set({
    //     categoryData: response.data,
    //     isLoading: false,
    //   });
  },
}));
