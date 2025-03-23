"use client";
import React, { useEffect } from "react";
import { useAuthStore } from "@/state/authState";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import dynamic from "next/dynamic";
import { ToastProvider } from "@heroui/toast";

const AuthProvider = dynamic(() => import("@/lib/authGuard"), {
  ssr: false,
});

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { restoreAuthState } = useAuthStore();

  useEffect(() => {
    restoreAuthState();
  }, [restoreAuthState]);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      disableTransitionOnChange={true}
    >
      <ToastProvider />
      <AuthProvider>{children}</AuthProvider>
    </NextThemesProvider>
  );
};

export default MainLayout;
