'use client';
import { IsLoading } from "@/components/shared/isLoading";
import { useProfileState } from "@/store/profileStore";
import React, { useEffect } from "react";

export default function DashboardWrapper({ children }: { children: React.ReactNode; }) {
  const { isLoading, profileRequest } = useProfileState()

  useEffect(() => {
    profileRequest();
  }, [profileRequest])

  if (isLoading) return <IsLoading />
  return (
    <main className="py-4 lg:py-7 transition-all duration-300 ease-in-out w-full px-2 md:px-10 lg:px-32">
      {children}
    </main>
  );
}
