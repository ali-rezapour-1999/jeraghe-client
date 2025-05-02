import { create } from "zustand";
import { AuthResult, AuthState } from "@/types/authStateType";
import {
  isAuthCheckAction,
  loginAction,
  logoutAction,
  registerAction,
  updateAction,
  userInfoAction,
} from "@/lib/api/authActions";

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  isLoading: false,
  setLoading: (isLoading: boolean) => set({ isLoading }),

  restoreAuthState: async () => {
    const response = await isAuthCheckAction();
    if (response.success) set({ isAuthenticated: true });
    return { message: response.message, success: response.success };
  },

  userInformation: async () => {
    set({ isLoading: true });
    const response = await userInfoAction();
    if (response.success) set({ user: response.data, isLoading: false });
  },

  login: async (email: string, password: string): Promise<AuthResult> => {
    set({ isLoading: true });
    const response = await loginAction(email, password);
    if (response != null) {
      set({ isLoading: false });
      if (response.success) set({ isAuthenticated: true, user: response.data });
    }
    return { message: response.message, success: response.success };
  },

  register: async (
    email: string,
    password: string,
    username: string
  ): Promise<AuthResult> => {
    set({ isLoading: true });

    const response = await registerAction(email, password, username);
    if (response != null) {
      set({ isLoading: false });
      if (response.success) set({ isAuthenticated: true, user: response.data });
    }
    return { message: response.message, success: response.success };
  },

  userUpdate: async (data: FormData): Promise<AuthResult> => {
    set({ isLoading: true });
    const response = await updateAction(data);
    if (response != null) set({ isLoading: false });
    return { message: response.message, success: response.success };
  },

  logout: () => {
    logoutAction();
    set({
      isAuthenticated: false,
      user: null,
    });
  },
}));
