"use client";

import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useAuthStore } from "@/state/authState";
import { useProfileStore } from "@/state/profileState";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { restoreAuthState, userPersonal, isAuthenticated } = useAuthStore();
  const { profileRequest } = useProfileStore();

  useEffect(() => {
    restoreAuthState();
  }, [restoreAuthState]);

  useEffect(() => {
    const slugId = Cookies.get("user_slug");
    if (slugId) {
      userPersonal();
      profileRequest(slugId);
    }
  }, [userPersonal, isAuthenticated, profileRequest]);

  return <main>{children}</main>;
};

export default MainLayout;
