import { create } from "zustand";
import { ViewPostType } from "@/utils/type/postStateType";
import { listPostAction } from "@/utils/actions/postBlogActions/listPostAction";

export const useListPostState = create<ViewPostType>((set) => ({
  postData: null,
  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),

  requestPostView: async () => {
    set({ isLoading: true });
    const response = await listPostAction();
    if (response.success)
      set({
        postData: response.data,
        isLoading: false,
      });
  },
}));
