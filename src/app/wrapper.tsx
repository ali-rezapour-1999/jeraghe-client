"use client";
import React, { useEffect, useCallback } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import dynamic from "next/dynamic";
import { ToastProvider } from "@heroui/toast";
import { useAuthStore } from "@/state/authState";
import "highlight.js/styles/github.css";
import "github-markdown-css/github-markdown.css";

const AuthProvider = dynamic(() => import("@/utils/lib/authGuard"), {
  ssr: false,
});

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { restoreAuthState, userInformation } = useAuthStore();

  const initializeAuth = useCallback(async () => {
    const res = await restoreAuthState();
    if (res.success) userInformation();
  }, [restoreAuthState, userInformation]);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ToastProvider />
      <AuthProvider>{children}</AuthProvider>
    </NextThemesProvider>
  );
};

export default MainLayout;
