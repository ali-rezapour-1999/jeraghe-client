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
const dashbordLink = [
  { id: 1, link: "/dashbords", title: "نگاه کلی", icon: <TrendingUpDown /> },
  { id: 2, link: "/dashbords/profile", title: "پروفایل", icon: <User /> },
  { id: 3, link: "/dashbords/posts", title: "پست", icon: <Pen /> },
  {
    id: 4,
    link: "/dashbords/request",
    title: "درخواست",
    icon: <BriefcaseIcon />,
  },
  { id: 5, link: "/dashbords/message", title: "پیام ها", icon: <Bell /> },
  { id: 6, link: "/dashbords/tiket", title: "تیکت ها", icon: <ShieldAlert /> },
  { id: 7, link: "/dashbords/setting", title: "تنظیمات", icon: <Settings /> },
];

const DashbordSidebar: React.FC = () => {
  const router = useRouter();
  const { logout } = useAuthStore();
  const path = usePathname();
  const logoutHandler = () => {
    logout();
    router.push("/");
  };
  return (
    <div className="w-[450px] pr-5 max-h-[750px] h-[750px] flex flex-col justify-between">
      <div className="dark:bg-primary-dark/30 py-10 rounded-2xl">
        <div className="h-full flex flex-col items-start pl-10 pr-3 gap-5">
          {dashbordLink.map((item) => (
            <Btn
              link={item.link}
              key={item.id}
              className={`w-full flex items-center py-6 justify-start text-xl bg-transparent hover:bg-light/10 ${path === item.link ? "bg-primary/20 dark:bg-light/20" : "bg-transparent"}`}
            >
              <span>{item.icon}</span>
              {item.title}
            </Btn>
          ))}
        </div>
      </div>
      <Btn
        onClick={logoutHandler}
        className=" bg-accent w-full mt-10 py-5 text-lg"
      >
        خروج از حساب کاربری
      </Btn>
    </div>
  );
};
export default DashbordSidebar;
