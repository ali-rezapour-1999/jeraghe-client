"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import useBreakpoint from "@/hooks/useBreakPoint";

interface DashboardRoutesType {
  href: string;
  label: string;
  title: string;
  description: string;
}

const dashboardRoutes: DashboardRoutesType[] = [
  {
    href: "/dashboard/settings",
    label: "تنظیمات",
    title: "تنظیمات سامانه",
    description: "مدیریت تنظیمات حساب کاربری و سایت",
  },
  {
    href: "/dashboard/message",
    label: "اعلانات",
    title: "اعلانات",
    description: "اعلانات هاتو میتونی از اینجا مدیرت کنی",
  },
  {
    href: "/dashboard/post",
    label: "ایدها",
    title: "ایدها",
    description: "ایده هاتو میتونی از اینجا مدیرت کنی",
  },
  {
    href: "/dashboard/idea",
    label: "پست‌های",
    title: "پست‌های",
    description: "پست ها تو میتونی از اینجا مدیرت کنی",
  },
  {
    href: "/dashboard",
    label: "در یک نگاه",
    title: "پروفایل",
    description: "مرورگر سایت و مدیریت صفحات و رویدادها",
  },
];

function TitleItems({ pathname }: { pathname: string }) {
  const routeItem = dashboardRoutes.find((route) => pathname.endsWith(route.href));

  if (!routeItem) return null;

  return (
    <div className="pl-3">
      <h1 className="text-3xl font-bold tracking-tight">{routeItem.title}</h1>
      <p className="text-muted-foreground">{routeItem.description}</p>
    </div>
  );
}

export function DynamicTitleBar() {
  const pathname = usePathname();
  const router = useRouter();
  const width = useBreakpoint();

  let maxVisibleTabs = 5;

  if (width.size >= 1280) maxVisibleTabs = 5;
  else if (width.size >= 920) maxVisibleTabs = 4;
  else if (width.size >= 768) maxVisibleTabs = 3;
  else if (width.size >= 480) maxVisibleTabs = 2;
  else {
    maxVisibleTabs = 0;
  }

  return (
    <div className="flex md:flex-row md:items-center justify-between px-4 py-2 md:px-6 md:py-3 border-b-1">
      <TitleItems pathname={pathname} />
      <div className="sm:hidden ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="main">
              <MenuIcon className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {dashboardRoutes.slice(maxVisibleTabs).map((route) => (
              <DropdownMenuItem
                key={route.href}
                onClick={() => router.push(route.href)}
                className={pathname === route.href ? "bg-accent" : ""}
              >
                {route.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="hidden sm:flex items-center">
        <Tabs value={pathname} className="w-full">
          <TabsList className="flex w-full justify-start items-center dark:bg-transparent">
            {dashboardRoutes.slice(0, maxVisibleTabs).map((route) => (
              <TabsTrigger
                key={route.href}
                value={route.href}
                onClick={() => router.push(route.href)}
                className={`text-center text-sm data-[state=active]:text-primary min-w-0 w-[20px]` + pathname === route.href ? " bg-accent" : " hover:bg-gray-300/20"}
              >
                {route.label}
              </TabsTrigger>
            ))}
            {dashboardRoutes.length > maxVisibleTabs && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-xl">
                    ...
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {dashboardRoutes.slice(maxVisibleTabs).map((route) => (
                    <DropdownMenuItem
                      key={route.href}
                      onClick={() => router.push(route.href)}
                      className={pathname === route.href ? "bg-accent" : ""}
                    >
                      {route.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </TabsList>
        </Tabs>
      </div>
    </div >
  );
}
