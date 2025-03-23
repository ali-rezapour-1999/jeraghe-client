import { create } from "zustand";
import { ViewPostType, PostType } from "@/utils/type/postStateType";
import { RequestResult } from "@/utils/type/baseType";
import { createPostAction } from "@/utils/actions/postBlogActions/createPostAction";

export const useUserPostState = create<ViewPostType>((set) => ({
  postData: null,
  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),

  createUserPost: async (data: PostType): Promise<RequestResult> => {
    set({ isLoading: true });

    const response = await createPostAction(data);
    if (response.success)
      set({
        postData: response.data,
        isLoading: false,
      });
    return { message: response.message, success: response.success };
  },
}));
