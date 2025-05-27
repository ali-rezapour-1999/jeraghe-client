"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Briefcase, ChevronLeft, ChevronRight, FileText, Home, Settings, Share2, TicketCheck, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  {
    title: "نگاه کلی",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "اطلاعات شخصی",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    title: "بخش ایده‌ها",
    href: "/dashboard/idea",
    icon: Briefcase,
  },
  {
    title: "فضای مجازی",
    href: "/dashboard/social",
    icon: Share2,
  },
  {
    title: "بلاگ",
    href: "/dashboard/blog",
    icon: FileText,
  },
  {
    title: "اعلانات",
    href: "/dashboard/message",
    icon: Bell,
  },
  {
    title: "تیکت‌ها",
    href: "/dashboard/tickets",
    icon: TicketCheck,
  },
  {
    title: "تنظیمات",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

const DashboardSidebar = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "flex h-screen flex-col border-r bg-transparent transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[70px]" : "w-[300px] lg:w-[280px]"
      )}
    >
      <div className="p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn("mx-auto", !isCollapsed && "ml-auto")}
          aria-label={isCollapsed ? "باز کردن نوار کناری" : "جمع کردن نوار کناری"}
          aria-expanded={!isCollapsed}
        >
          {
            isCollapsed ? <ChevronRight /> : <ChevronLeft />
          }
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-2">
          {sidebarLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-lg font-medium transition-colors",
                  pathname === link.href
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground",
                  isCollapsed && "justify-center px-2"
                )}
                aria-current={pathname === link.href ? "page" : undefined}
                aria-label={link.title}
              >
                <link.icon className="h-6 w-6 flex-shrink-0" />
                {!isCollapsed && <span>{link.title}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default DashboardSidebar;
