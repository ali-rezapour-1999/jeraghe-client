import Btn from "@/components/ui/btn";
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

const DashboardSidebar: React.FC = () => {
  const router = useRouter();
  const { logout } = useAuthStore();
  const path = usePathname();
  const logoutHandler = () => {
    logout();
    router.push("/");
  };
  return (
    <div className="w-[450px] pr-5 max-h-[750px] h-[750px] flex flex-col justify-between">
      <div className="dark:bg-primary-dark/30 bg-primary-dark/10 py-10 rounded-2xl min-h-[700px]">
        <div className="h-full flex flex-col items- justify-between px-8 gap-5">
          <div className="h-full flex flex-col items- justify-start gap-5">
            {dashboardItem.map((item) => (
              <Btn
                link={item.link}
                key={item.id}
                className={`w-full flex items-center py-6 justify-start text-xl bg-transparent dark:hover:bg-light/10 hover:bg-primary/10 ${path === item.link ? "bg-primary/30 dark:bg-light/20" : "bg-transparent"}`}
              >
                <span>{item.icon}</span>
                {item.title}
              </Btn>
            ))}
          </div>

          <Btn
            onClick={logoutHandler}
            className=" bg-red-600 w-full mt-10 py-5 text-lg text-light"
          >
            <ImExit />
            خروج از حساب کاربری
          </Btn>
        </div>
      </div>
    </div>
  );
};
export default DashboardSidebar;
