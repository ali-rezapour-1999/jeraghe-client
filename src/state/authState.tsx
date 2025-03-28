import { create } from "zustand";
import { AuthResult, AuthState, User } from "@/utils/type/authStateType";
import {
  isAuthCheckAction,
  loginAction,
  logoutAction,
  registerAction,
  updateAction,
} from "@/utils/actions/authActions";

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  isLoading: false,
  setLoading: (isLoading: boolean) => set({ isLoading }),

  restoreAuthState: async () => {
    const response = await isAuthCheckAction();
    if (response != null) {
      if (response.success) set({ isAuthenticated: true, user: response.data });
    }
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
    username: string,
  ): Promise<AuthResult> => {
    set({ isLoading: true });

    const response = await registerAction(email, password, username);
    if (response != null) {
      set({ isLoading: false });
      if (response.success) set({ isAuthenticated: true, user: response.data });
    }
    return { message: response.message, success: response.success };
  },

  userUpdate: async (data: User): Promise<AuthResult> => {
    set({ isLoading: true });
    const response = await updateAction(data);
    if (response != null) {
      set({ isLoading: false });
    }
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
