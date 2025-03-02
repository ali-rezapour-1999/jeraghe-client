import { create } from "zustand"
import { ViewPostType } from "@/type/postStateType"
import { viewPostAction } from "@/app/api/postBlogAction/viewPostAction";


//todo this not for one user this is all data for all user
export const useViewPostState = create<ViewPostType>((set) => ({
  postData: null,
  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),

  requestPostView: async () => {
    set({ isLoading: true });

    const response = await viewPostAction();
    if (response.success)
      set({
        postData: response.data,
        isLoading: false,
      });
  }
}))
