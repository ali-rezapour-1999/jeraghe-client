import { create } from "zustand";
import { ViewPostType } from "@/types/postStateType";
import { RequestResult } from "@/types/baseType";
import { createPostAction } from "@/lib/api/postBlogActions/createPostAction";

export const useUserPostState = create<ViewPostType>((set) => ({
  postData: null,
  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),

  createUserPost: async (data: FormData): Promise<RequestResult> => {
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
