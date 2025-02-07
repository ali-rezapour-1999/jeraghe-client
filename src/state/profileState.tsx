import { create } from "zustand";
import Cookies from "js-cookie";
import { AxiosError } from "axios";
import {
  ProfileState,
  ProfileResponse,
  WorkHistoryResponse,
  ProfileResult,
} from "../type/profileStateType";
import api from "@/lib/baseApi";

export const useProfileState = create<ProfileState>((set) => ({
  isLoading: false,
  error: null,
  personalData: null,
  workHistoryData: null,
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  profileRequest: async () => {
    set({ isLoading: true, error: null });
    try {
      const userId = Cookies.get("user_slug");
      if (userId) {
        const personalRes = await api.get<ProfileResponse>(
          `/profile/profiles/${userId}/`,
        );
        set({
          personalData: personalRes.data,
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

  workHistoryRequest: async (slug_id: string) => {
    set({ isLoading: true, error: null });
    try {
      const userId = Cookies.get("user_slug");
      if (userId) {
        const workHistoryRes = await api.get<WorkHistoryResponse>(
          `/profile/work-history/${slug_id}/`,
        );

        set({
          workHistoryData: workHistoryRes.data,
        });
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        set({ error: error.response?.data?.message || error.message });
      } else if (error instanceof Error) {
        set({ error: error.message });
      } else {
        set({ error: "مشکلی پیش اومده لطفا مجدد تلاش کنید" });
      }
    } finally {
      set({ isLoading: false });
    }
  },

  profileUpdate: async (data: ProfileResponse): Promise<ProfileResult> => {
    set({ isLoading: true, error: null });

    try {
      const userId = Cookies.get("user_slug");
      if (!userId) {
        return {
          success: false,
          status: 400,
          message: "شناسه کاربری یافت نشد.",
        };
      }

      const response = await api.patch<ProfileResponse>(
        `/profile/profiles/${userId}/`,
        data,
      );

      if (response.status === 200) {
        return {
          success: true,
          status: response.status,
          message: "تغییرات با موفقیت اعمال شد",
        };
      }

      return {
        success: false,
        status: response.status,
        message: "تلاش برای تغییرات با خطا مواجه شده، دوباره تلاش کنید",
      };
    } catch (error: unknown) {
      const status =
        (error as { response?: { status: number } })?.response?.status || 500;

      let message = "تلاش برای تغییرات با خطا مواجه شده، دوباره تلاش کنید";

      switch (status) {
        case 404:
          message = "حساب کاربری پیدا نشد. لطفاً ثبت‌نام کنید.";
          break;
        case 400:
        case 401:
          message = "رمز عبور نادرست است.";
          break;
        case 500:
          message = "خطای سرور. لطفاً مجدد تلاش کنید.";
          break;
        default:
          message = "خطای ناشناخته";
          break;
      }

      set({ error: message });

      return {
        success: false,
        status,
        message,
      };
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
