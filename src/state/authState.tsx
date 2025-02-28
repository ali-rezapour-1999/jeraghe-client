import { create } from "zustand";
import { AuthResult, AuthState, User } from "@/type/authStateType";
import { loginAction } from "@/app/api/auth/actions/loginAction";
import { registerAction } from "@/app/api/auth/actions/registerAction";
import { logoutAction } from "@/app/api/auth/actions/logoutAction";
import { updateAction } from "@/app/api/auth/actions/updateAction";
import { isAuthCheckAction } from "@/app/api/auth/actions/isAuthCheckAction";

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
    if (response != null) {
      set({ isLoading: false })
    }
    return { message: response.message, success: response.success }
  },


  register: async (email: string, password: string, username: string): Promise<AuthResult> => {
    set({ isLoading: true });

    const response = await registerAction(email, password, username);
    if (response != null) {
      set({ isLoading: false })
    }
    return { message: response.message, success: response.success }
  },

  userUpdate: async (data: User): Promise<AuthResult> => {
    set({ isLoading: true });
    const response = await updateAction(data);
    if (response != null) {
      set({ isLoading: false })
    }
    return { message: response.message, success: response.success }
  },

  logout: () => {
    logoutAction()
    set({
      isAuthenticated: false,
      user: null,
    });
  },
}));

