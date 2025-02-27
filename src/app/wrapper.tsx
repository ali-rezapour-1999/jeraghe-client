"use client";
import React, { useEffect } from "react";
import { useAuthStore } from "@/state/authState";
import { SessionProvider } from "next-auth/react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { restoreAuthState } = useAuthStore();

  useEffect(() => {
    restoreAuthState();
  }, [restoreAuthState]);

  return (
    <main>
      <SessionProvider>{children}</SessionProvider>
    </main>
  );
};

export default MainLayout;
