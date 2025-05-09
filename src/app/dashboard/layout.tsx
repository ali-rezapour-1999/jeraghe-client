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
          <main className="py-4 lg:py-7 transition-all duration-300 ease-in-out w-full px-2 lg:px-16">
            <div>{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
