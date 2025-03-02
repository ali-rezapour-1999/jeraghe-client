"use client";
import React, { useEffect } from "react";
import { useAuthStore } from "@/state/authState";
import { SessionProvider } from "next-auth/react";
import { useProfileState, useSocialMediaState } from "@/state/userInformationStore";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { restoreAuthState, isAuthenticated } = useAuthStore();
  const { profileRequest } = useProfileState();
  const { socialMediaRequest } = useSocialMediaState();

  useEffect(() => {
    restoreAuthState();
  }, [restoreAuthState]);

  useEffect(() => {
    if (isAuthenticated) {
      profileRequest();
      socialMediaRequest();
    }
  }, [profileRequest, socialMediaRequest, isAuthenticated]);

  return <SessionProvider>{children}</SessionProvider>;
};

export default MainLayout;
