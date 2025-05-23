"use client";
import React, { useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import dynamic from "next/dynamic";
import { useAuthStore } from "@/store/authState";
import "highlight.js/styles/github.css";
import "github-markdown-css/github-markdown.css";
import { useProfileState } from "@/store/profileStore";
import { Toaster } from "sonner";

const AuthProvider = dynamic(() => import("@/lib/authGuard"), {
  ssr: false,
});

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { restoreAuthState, userInformation } = useAuthStore();
  const { profileRequest } = useProfileState();

  useEffect(() => {
    const initializeAuth = async () => {
      const res = await restoreAuthState();
      if (res.success) {
        userInformation();
        profileRequest();
      }
    };
    initializeAuth();
  }, [restoreAuthState, userInformation, profileRequest]);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Toaster />
      <AuthProvider>{children}</AuthProvider>
    </NextThemesProvider>
  );
};

export default MainLayout;
