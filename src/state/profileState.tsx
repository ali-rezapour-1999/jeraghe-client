import { create } from "zustand";
import Cookies from "js-cookie";
import { AxiosError } from "axios";
import {
  ProfileState,
  ProfileResponse,
  WorkHistoryResponse,
} from "../type/profileStateType";
import api from "@/api/baseApi";

export const useProfileState = create<ProfileState>((set) => ({
  isLoading: false,
  error: null,
  personalData: null,
  workHistoryData: null,

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  profileRequest: async (slug_id: string) => {
    set({ isLoading: true, error: null });
    try {
      const userId = Cookies.get("user_slug");
      if (userId) {
        const personalRes = await api.get<ProfileResponse>(
          `/profile/profiles/${slug_id}`,
        );
        const workHistoryRes = await api.get<WorkHistoryResponse>(
          `/profile/work-history/${slug_id}`,
        );

        set({
          personalData: personalRes.data,
          workHistoryData: workHistoryRes.data,
        });
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        set({ error: error.response?.data?.message || error.message });
      } else if (error instanceof Error) {
        set({ error: error.message });
      } else {
        set({ error: "An unknown error occurred" });
      }
    } finally {
      set({ isLoading: false });
    }
  },

  profileUpdate: async (data: ProfileResponse) => {
    set({ isLoading: true, error: null });
    try {
      const userId = Cookies.get("user_id");
      if (userId) {
        await api.patch<ProfileResponse>(`/profile/profiles/${userId}/`, data);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        set({ error: error.response?.data?.message || error.message });
      } else if (error instanceof Error) {
        set({ error: error.message });
      } else {
        set({ error: "An unknown error occurred" });
      }
    } finally {
      set({ isLoading: false });
    }
  },

  workHistoryUpdate: async (data: WorkHistoryResponse) => {
    set({ isLoading: true, error: null });
    try {
      const userId = Cookies.get("user_id");
      if (userId) {
        await api.patch<WorkHistoryResponse>(
          `/profile/work-history/${userId}/`,
          data,
        );
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        set({ error: error.response?.data?.message || error.message });
      } else if (error instanceof Error) {
        set({ error: error.message });
      } else {
        set({ error: "An unknown error occurred" });
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));
