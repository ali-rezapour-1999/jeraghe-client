"use client";
import React from "react";
import DashboardNavbar from "./navbar";
import DashboardSidebar from "./sidebar";
import { useAuthStore } from "@/state/authState";

interface Props {
  children: React.ReactNode;
}

const DashboardWrapper: React.FC<Props> = ({ children }) => {
  const { user } = useAuthStore();
  return (
    <div>
      <DashboardNavbar user={user} />
      <div className="flex gap-3">
        <DashboardSidebar user={user} />
        <main className="flex px-20 items-center h-full w-full rounded-tr-[50px] mx-auto overflow-y-auto">
          <div className="max-w-[1200px] w-full dark:bg-primary-dark/30 bg-primary-dark/10 px-20 py-5 rounded-3xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardWrapper;
