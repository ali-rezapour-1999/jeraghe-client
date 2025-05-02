import type React from "react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col w-full">
        <DashboardHeader />
        <div className="flex flex-1">
          <DashboardSidebar />
          <main className="p-4 md:p-6 transition-all duration-300 ease-in-out w-full">
            <div>{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
