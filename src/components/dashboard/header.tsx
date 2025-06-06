"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import Logo from "../shared/logo";
import { useAuthStore } from "@/store/authState";
import DarkModeToggle from "../shared/darkModeToggle";

export function DashboardHeader() {
  const { isMobile } = useSidebar();
  const { user } = useAuthStore();

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 px-4 md:px-6 z-50 backdrop-blur-md justify-between w-full">
      <div className="flex flex-1 items-center gap-4 md:w-1/4">
        <div className="flex items-center gap-2">
          <div className="flex h-16 w-16 items-center justify-center rounded-md  text-white">
            <Logo />
          </div>
        </div>
      </div>


      <div className="flex items-center gap-2 md:gap-0 md:w-1/4 justify-end">
        {isMobile && <SidebarTrigger />}

        <Button variant="ghost" className="rounded-xl">
          <Bell className="size-5" />
        </Button>
        <DarkModeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" >
              <Avatar className="h-8 w-8 transition-all duration-200 hover:ring-2 hover:ring-secondary">
                <AvatarImage
                  src={user?.image_url}
                  className="object-cover shadow-2xl drop-shadow-2xl"
                  alt="تصویر کاربر"
                />
                <AvatarFallback className="bg-secondary text-white">
                  {user?.username.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile">پروفایل</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings">تنظیمات</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>خروج</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

    </header>
  );
}
