"use client";
import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import dynamic from "next/dynamic";
import { ToastProvider } from "@heroui/toast";
import { useCheckAuth } from "@/hook/useCheckAuth";

const AuthProvider = dynamic(() => import("@/utils/lib/authGuard"), {
  ssr: false,
});

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  useCheckAuth();
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
