import { create } from "zustand";
import { AuthResult, AuthState, User } from "@/type/authStateType";
import { loginAction } from "@/app/api/auth/actions/loginAction";
import { registerAction } from "@/app/api/auth/actions/registerAction";
import { logoutAction } from "@/app/api/auth/actions/logoutAction";
import { updateAction } from "@/app/api/auth/actions/updateAction";
import { isAuthCheckAction } from "@/app/api/auth/actions/isAuthCheckAction";
import { userInfoAction } from "@/app/api/auth/actions/userInfoAction";

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  isLoading: false,
  setLoading: (isLoading: boolean) => set({ isLoading }),

  restoreAuthState: async () => {
    const user = await isAuthCheckAction();
    if (user) {
      set({ isAuthenticated: true, user });
    }
  },

  login: async (email: string, password: string): Promise<AuthResult> => {
    set({ isLoading: true });
    const response = await loginAction(email, password);
    if (response.success) {
      set({
        isAuthenticated: true,
        isLoading: false
      });
      return {
        message: response.message,
      };
    } else {
      set({ isLoading: false })
      return {
        message: response.message,
      };
    }
  },


  register: async (
    email: string,
    password: string,
    username: string,
  ): Promise<AuthResult> => {
    set({ isLoading: true });

    const response = await registerAction(email, password, username);
    if (response.success) {
      set({
        isAuthenticated: true,
        isLoading: false
      });
      return {
        message: response.message,
      };
    } else {
      set({ isLoading: false })
      return {
        success: false,
        message: response.message,
      };
    }
  },

  userInfo: async () => {
    set({ isLoading: true });
    const response = await userInfoAction()
    if (response.success) {
      set({
        isAuthenticated: true,
        isLoading: false
      });

    } else {
      set({ isLoading: false })
    } 
  },

  userUpdate: async (data: User): Promise<AuthResult> => {
    set({ isLoading: true });

    const response = await updateAction(data);
    if (response.success) {
      set({
        isAuthenticated: true,
        isLoading: false
      });
      return {
        message: response.message,
      };
    } else {
      set({ isLoading: false })
      return {
        message: response.message,
      };
    }
  },

  logout: () => {
    logoutAction()
    set({
      isAuthenticated: false,
      user: null,
      token: null
    });
  },
}));

