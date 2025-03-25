"use client";
import React, { useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import dynamic from "next/dynamic";
import { ToastProvider } from "@heroui/toast";
import { useAuthStore } from "@/state/authState";

const AuthProvider = dynamic(() => import("@/utils/lib/authGuard"), {
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
      <AuthProvider>
        <main className="px-1">{children}</main>
      </AuthProvider>
    </NextThemesProvider>
  );
};

export default MainLayout;
