import { create } from "zustand";
import Cookies from "js-cookie";
import api from "@/lib/baseApi";
import { AuthResult, AuthState, User } from "@/type/authStateType";

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  isLoading: false,
  error: null,
  setLoading: (isLoading: boolean) => set({ isLoading }),
  setError: (error: string | null) => set({ error }),

  restoreAuthState: () => {
    if (typeof window !== "undefined") {
      const token = Cookies.get("access_token");
      const userSlug = Cookies.get("user_slug");

      if (token && userSlug) {
        set({
          isAuthenticated: true,
          token,
        });
      }
    }
  },

  login: async (email: string, password: string): Promise<AuthResult> => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/auth/login/", { email, password });

      if (response.status === 200) {
        const data = response.data;

        Cookies.set("access_token", data.access, { expires: 7, path: "/" });
        Cookies.set("refresh_token", data.refresh, { expires: 7, path: "/" });
        Cookies.set("user_slug", data.user.slug || "", {
          expires: 7,
          path: "/",
        });

        set({
          isAuthenticated: true,
          user: {
            email: data.email,
            slug: data.slug_id,
            profile_image: data.profile_image,
            username: data.username,
            phone_number: data.phone_number,
          },
          token: data.access,
          error: null,
        });

        return {
          success: true,
          data,
          status: response.status,
          message: "خوش آمدید",
        };
      }

      return {
        success: false,
        status: response.status,
        message: "تلاش برای ورود با خطا مواجه شده",
      };
    } catch (error: unknown) {
      const status =
        (error as { response: { status: number } })?.response?.status || 500;
      let message = "تلاش برای ورود با خطا مواجه شده";

      switch (status) {
        case 404:
          message =
            "حساب کابری با این ایمیل پیدا نکردم.میتونی بخش ثبت نام و امتحان کنی.";
          break;
        case 400:
          message = "در خواست نا معتبر";
        case 401:
          message = "رمز عبور نادرست است";
          break;
        case 500:
          message = "خطای سرور. لطفا مجدد تلاش کنید.";
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

  register: async (
    email: string,
    password: string,
    username: string,
  ): Promise<AuthResult> => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/auth/register/", {
        email,
        password,
        username,
      });

      if (response.status === 201 || response.status === 200) {
        const data = response.data;

        Cookies.set("access_token", data.access, { expires: 7, path: "/" });
        Cookies.set("refresh_token", data.refresh, { expires: 7, path: "/" });
        Cookies.set("user_slug", data.user.slug || "", {
          expires: 7,
          path: "/",
        });
        Cookies.set("user_email", data.user.email || "", {
          expires: 7,
          path: "/",
        });

        set({
          isAuthenticated: true,
          user: {
            email: data.email,
            slug: data.slug_id,
            profile_image: data.profile_image,
            username: data.username,
            phone_number: data.phone_number,
          },
          token: data.access,
          error: null,
        });

        return {
          success: true,
          status: response.status,
          message: "حساب کاربری با موفقیت ساخته شده",
        };
      }

      return {
        success: false,
        status: response.status,
        message: "متاسفانه خطایی رخ داده لطفا مجدد تلاش کنید",
      };
    } catch (error: unknown) {
      const status =
        (error as { response: { status: number } })?.response?.status || 500;
      let message = "متاسفانه خطایی رخ داده لطفا مجدد تلاش کنید";

      switch (status) {
        case 400:
          message =
            "با این ایمیل حساب کاربری دارید لطفا از بخش ورود امتحان کنید";
          break;
        case 409:
          message =
            "با این ایمیل حساب کاربری دارید لطفا از بخش ورود امتحان کنید";
          break;
        case 500:
          message = "خطای سرور. لطفا مجدد تلاش کنید";
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

  logout: () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    Cookies.remove("user_slug");
    Cookies.remove("user_email");
    set({
      isAuthenticated: false,
      user: null,
      token: null,
      error: null,
    });
  },

  userPersonal: async () => {
    set({ isLoading: true, error: null });
    try {
      const token = Cookies.get("access_token");
      const slug_id = Cookies.get("user_slug");

      const response = await api.get(`auth/get/${slug_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const userData = response.data;
        set({
          user: {
            email: userData.email,
            slug: userData.slug_id,
            profile_image: userData.profile_image,
            username: userData.username,
            phone_number: userData.phone_number,
          },
        });
      }
    } catch (error: unknown) {
      const status =
        (error as { response: { status: number } })?.response?.status || 500;
      let message = "در برقراری ارتباط مشکلی صورت گرفته";

      switch (status) {
        case 401:
          message = "کد احراض هویت شما منقضی شده از بخش ورود دوباره تلاش کنید";
          break;
        case 404:
          message = "کاربر مورد نظر یافت نشد";
          break;
        case 500:
          message = "مشکل در برقراری ارتباط به سرور";
          break;
        default:
          message = "خطای ناشناخته دوباره سعی در تلاش دوباره";
          break;
      }
      set({ error: message });
    } finally {
      set({ isLoading: false });
    }
  },

  userUpdate: async (data: User): Promise<AuthResult> => {
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

      const response = await api.patch<AuthResult>(`auth/get/${userId}/`, data);

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
          message =
            "در هنگام اعمال تغییرات با خطا مواجه شدیم لطفا دقایقی دیگر دوباره تلاش کنید";
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
}));
