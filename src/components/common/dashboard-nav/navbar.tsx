import React from "react";
import Logo from "../logo";
import { FaUserLarge } from "react-icons/fa6";
import Image from "next/image";
import { User } from "@/utils/type/authStateType";

const DashboardNavbar = ({ user }: { user: User }) => {
  return (
    <nav className="h-[130px] p-7">
      <div className="w-full flex items-center justify-between px-10 py-1 rounded-2xl">
        <div className="flex justify-center items-center gap-5">
          <div className="w-[60px] ">
            <Logo />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold">خوش‌آمدی به جرقه!</h1>
            <p className="text-sm">
              مسیرت برای شغل و ساخت ایده‌ها شروع شده. 🚀
            </p>
          </div>
        </div>
        <div className="flex items-center gap-7">
          <div className="flex flex-col items-center justify-end">
            <p>{user?.email || ""}</p>
          </div>
          {user.image ? (
            <Image height={200} src={user.image} width={300} alt={user.email} />
          ) : (
            <FaUserLarge className="size-7" />
          )}
        </div>
      </div>
    </nav>
  );
};
export default DashboardNavbar;
