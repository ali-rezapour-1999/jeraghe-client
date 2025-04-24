import Btn from "@/components/ui/button";
import React from "react";
import {
  Settings,
  User,
  Pen,
  TrendingUpDown,
  BriefcaseIcon,
  Bell,
  ShieldAlert,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/state/authState";
import { useRouter } from "next/navigation";
import { ImExit } from "react-icons/im";

const dashboardItem = [
  { id: 1, link: "/dashboard", title: "نگاه کلی", icon: <TrendingUpDown /> },
  { id: 2, link: "/dashboard/profile", title: "پروفایل", icon: <User /> },
  { id: 3, link: "/dashboard/posts", title: "پست", icon: <Pen /> },
  {
    id: 4,
    link: "/dashboard/request",
    title: "درخواست",
    icon: <BriefcaseIcon />,
  },
  { id: 5, link: "/dashboard/message", title: "پیام ها", icon: <Bell /> },
  { id: 6, link: "/dashboard/tiket", title: "تیکت ها", icon: <ShieldAlert /> },
  { id: 7, link: "/dashboard/setting", title: "تنظیمات", icon: <Settings /> },
];

const DashboardHeader = () => {
  const router = useRouter();
  const { logout } = useAuthStore();
  const path = usePathname();
  const logoutHandler = () => {
    logout();
    router.push("/");
  };
  return (
    <div className="flex w-full items-center justify-between border-b-1 pb-2">
      <div className="flex justify-start gap-2">
        {dashboardItem.map((item) => (
          <Btn
            link={item.link}
            key={item.id}
            className={`flex items-center w-max lg:w-[120px] dark:hover:bg-light/10 hover:bg-primary/10 ${path === item.link ? "bg-primary/30 dark:bg-light/20" : "bg-transparent"}`}
          >
            <span>{item.icon}</span>
            <span className="hidden lg:block">{item.title}</span>
          </Btn>
        ))}
      </div>

      <Btn onClick={logoutHandler} className=" bg-red-800  text-md text-light">
        <ImExit />
        <span className="hidden lg:block text-sm md:text-md">
          خروج از حساب کاربری
        </span>
      </Btn>
    </div>
  );
};
export default DashboardHeader;
