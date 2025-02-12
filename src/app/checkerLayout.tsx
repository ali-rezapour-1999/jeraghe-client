"use client";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useAuthStore } from "@/state/authState";
import { useProfileState } from "@/state/profileState";
import { SessionProvider } from "next-auth/react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { restoreAuthState, userPersonal, isAuthenticated } = useAuthStore();
  const { profileRequest } = useProfileState();

  useEffect(() => {
    restoreAuthState();
  }, [restoreAuthState]);

  useEffect(() => {
    const slugId = Cookies.get("user_slug");
    if (slugId) {
      userPersonal();
      profileRequest();
      userPersonal();
    }
  }, [userPersonal, isAuthenticated, profileRequest]);

  return (
    <main>
      <SessionProvider>{children}</SessionProvider>
    </main>
  );
};

export default MainLayout;
