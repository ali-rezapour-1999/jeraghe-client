"use client";

import { Bell, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { useTheme } from "next-themes";
import Logo from "../shared/logo";
import { useAuthStore } from "@/store/authState";

export function DashboardHeader() {
  const { setTheme } = useTheme();
  const { isMobile } = useSidebar();
  const { user } = useAuthStore();

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 px-4 shadow-lg  md:px-6 z-50 backdrop-blur-md">
      <div className="flex flex-1 items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-18 w-18 items-center justify-center rounded-md  text-white">
            <Logo />
          </div>
          <span className="hidden text-xl font-bold md:inline-block">
            به جرقه خوش آمدید
          </span>
        </div>

      </div>

      <div className="flex items-center gap-2">
        {isMobile && <SidebarTrigger />}

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-6 w-6 size-3" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] text-white">
            ۳
          </span>
          <span className="sr-only">اعلان‌ها</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Sun className="h-6 w-6 size-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-6 w-6 size-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">تغییر تم</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              روشن
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              تاریک
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              سیستم
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-8 w-8 rounded-full mx-3"
            >
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
