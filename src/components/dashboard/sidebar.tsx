"use client"

import { Briefcase, ChevronLeft, ChevronRight, FileText, LifeBuoy, LogOut, Settings, Ticket, User } from "lucide-react"
import { MdDashboard } from "react-icons/md";
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/store/authState";
import { Link } from "../ui/link";

interface MenuItem {
  path: string
  label: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const mainMenuItems: MenuItem[] = [
  { path: "/dashboard", label: "داشبورد", icon: MdDashboard },
  { path: "/dashboard/profile", label: "پروفایل", icon: User },
  { path: "/dashboard/post", label: "مدیریت مقالات", icon: FileText },
  { path: "/dashboard/idea", label: "مدیریت ایده", icon: Briefcase },
  { path: "/dashboard/ticket", label: "تیکت‌ها", icon: Ticket },
  { path: "/dashboard/setting", label: "تنظیمات", icon: Settings },
]

const footerMenuItems: MenuItem[] = [
  { path: "/dashboard/support", label: "پشتیبانی", icon: LifeBuoy },
  { path: "#logout", label: "خروج", icon: LogOut },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { logout } = useAuthStore()
  const [isOpen, setIsOpen] = useState(true)

  const isActive = (path: string) => pathname === path

  const toggleSidebar = () => setIsOpen(!isOpen)

  const renderMenuItem = ({ path, label, icon: Icon }: MenuItem) => (
    <SidebarMenuItem key={path}>
      <SidebarMenuButton
        asChild
        isActive={isActive(path)}
        className={cn(
          isActive(path) ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground",
          "text-lg mt-4",
        )}
      >
        {path === "#logout" ? (
          <Button onClick={logout} className={`flex items-center dark:hover:bg-primary/20 hover:bg-red-800/20  h-12 ${!isOpen ? "justify-center" : "justify-start"}`} variant="ghost">
            <Icon className="ml-2 !w-6 !h-6 text-red-500" />
            {isOpen && <span className="text-red-500">{label}</span>}
          </Button>
        ) : (
          <Link href={path} className={`flex items-center dark:hover:bg-primary/20 hover:bg-primary-dark/10  h-12 ${!isOpen ? "justify-center" : "justify-start"}`} variant="ghost">
            <Icon className="ml-2 !w-6 !h-6" />
            {isOpen && <span>{label}</span>}
          </Link>
        )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  )

  return (
    <Sidebar
      side="right"
      className={cn("fixed top-[54px] right-0 z-40 h-[calc(100vh-44px)]  bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out md:sticky md:top-[64px] md:h-[calc(100vh-64px)] md:w-64 lg:w-72",
        isOpen ? "translate-x-0 px-3" : "w-16 md:w-16 lg:w-16",
      )}

    >
      <SidebarContent>
        <SidebarMenu>{mainMenuItems.map((item) => renderMenuItem(item))}</SidebarMenu>
      </SidebarContent>
      <div className="mt-auto">
        <SidebarFooter>
          <SidebarMenu>{footerMenuItems.map((item) => renderMenuItem(item))}</SidebarMenu>
        </SidebarFooter>
      </div>
      <SidebarRail onClick={toggleSidebar} className={`dark:bg-primary-dark/20 bg-primary hover:bg-white flex items-center rounded-l-full w-6`}>
        {isOpen ?
          <ChevronRight className="!w-10 !h-10" />
          :
          <ChevronLeft className="!w-10 !h-10" />
        }
      </SidebarRail>
    </Sidebar>
  )
}
