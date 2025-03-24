import { create } from "zustand";
import { AuthResult, AuthState, User } from "@/utils/type/authStateType";
import {
  loginAction,
  logoutAction,
  registerAction,
  updateAction,
  getUserInformationAction,
} from "@/utils/actions/authActions";

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  isLoading: false,
  setLoading: (isLoading: boolean) => set({ isLoading }),

  restoreAuthState: async (isConnect?: boolean) => {
    if (isConnect) set({ isAuthenticated: true });
    else set({ isAuthenticated: false });
  },

  getUserInformation: async () => {
    const response = await getUserInformationAction();
    if (response.success) {
      set({ user: response.data });
    }
  },

  login: async (email: string, password: string): Promise<AuthResult> => {
    set({ isLoading: true });

    const response = await loginAction(email, password);
    if (response != null) {
      set({ isLoading: false });
    }
    set({ isAuthenticated: true });
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
