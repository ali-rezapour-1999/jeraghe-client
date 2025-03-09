"use client";
import React, { useEffect } from "react";
import { useAuthStore } from "@/state/authState";
import { SessionProvider } from "next-auth/react";
import { useProfileState, useSocialMediaState } from "@/state/userInformationStore";
import DarkModeToggle from "@/components/common/darkModeToggle";

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
      //socialMediaRequest();
    }
  }, [profileRequest, socialMediaRequest, isAuthenticated]);

  return <SessionProvider>
    <DarkModeToggle className="hidden" />
    {children}</SessionProvider>;
};

export default MainLayout;
