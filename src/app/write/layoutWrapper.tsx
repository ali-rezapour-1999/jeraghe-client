"use client";
import { useAuthStore } from "@/state/authState";
import React from "react";
import NotAuth from "./notAuth";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  return <div>{isAuthenticated ? <div>{children}</div> : <NotAuth />}</div>;
};

export default LayoutWrapper;
