"use client";

import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useAuthStore } from "@/state/authState";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { restoreAuthState, userPersonal, isAuthenticated } = useAuthStore();

  useEffect(() => {
    restoreAuthState();
  }, [restoreAuthState]);

  useEffect(() => {
    const slugId = Cookies.get("user_slug");
    if (slugId) {
      userPersonal().catch((err) => {
        console.error("Failed to fetch user:", err);
      });
    }
  }, [userPersonal, isAuthenticated]);

  return <main>{children}</main>;
};

export default MainLayout;
