import { create } from "zustand";

interface ThemeState {
  isDark: string;
  setIsDark: (isDark: string) => void;
}

export const useThemeState = create<ThemeState>((set) => ({
  isDark: "dark",
  setIsDark: (isDark) => set({ isDark }),
}));
