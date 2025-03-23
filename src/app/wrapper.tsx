"use client";
import React, { useEffect } from "react";
import { useAuthStore } from "@/state/authState";
import {
  useProfileState,
  useSocialMediaState,
} from "@/state/userInformationStore";
import { ThemeProvider as NextThemesProvider } from "next-themes";

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

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      disableTransitionOnChange={true}
    >
      {children}
    </NextThemesProvider>
  );
};

export default MainLayout;
