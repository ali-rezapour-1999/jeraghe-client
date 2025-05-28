import type React from "react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardWrapper from "./wrapper";

export default function DashboardLayout({ children, }: { children: React.ReactNode; }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col w-full">
        <DashboardHeader />
        <div className="flex flex-1">
          <DashboardSidebar />
          <DashboardWrapper >
            <div>{children}</div>
          </DashboardWrapper>
        </div>
      </div>
    </SidebarProvider>
  );
}
