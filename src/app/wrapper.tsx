"use client";
import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import dynamic from "next/dynamic";
import { ToastProvider } from "@heroui/toast";

const AuthProvider = dynamic(() => import("@/utils/lib/authGuard"), {
  ssr: false,
});

const MainLayout = ({ children }: { children: React.ReactNode }) => {
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
