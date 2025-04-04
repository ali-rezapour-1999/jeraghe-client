"use client";
import React from "react";
import DashboardNavbar from "./navbar";
import { useAuthStore } from "@/state/authState";
import DashboardHeader from "./header";

interface Props {
  children: React.ReactNode;
}

const DashboardWrapper: React.FC<Props> = ({ children }) => {
  const { user } = useAuthStore();
  return (
    <div>
      <DashboardNavbar user={user} />
      <div className="max-w-[1500px] mx-auto px-3 lg:px-10">
        <DashboardHeader />
        <main className="flex items-center justify-center h-full w-full mx-auto overflow-y-auto">
          <div className="w-full dark:bg-primary-dark/30 bg-primary-dark/10 px-30 py-10 rounded-b-2xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardWrapper;
