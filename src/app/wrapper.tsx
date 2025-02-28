"use client";
import React, { useEffect } from "react";
import { useAuthStore } from "@/state/authState";
import { SessionProvider } from "next-auth/react";
import { useProfileState } from "@/state/profileState";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { restoreAuthState } = useAuthStore();
  const { profileRequest, socialMediaRequest } = useProfileState();

  useEffect(() => {
    restoreAuthState();
  }, [restoreAuthState]);

  useEffect(() => {
    profileRequest();
    socialMediaRequest();
  }, [profileRequest, socialMediaRequest]);

  return <SessionProvider>{children}</SessionProvider>;
};

export default MainLayout;
