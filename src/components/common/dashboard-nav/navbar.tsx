import React from "react";
import Logo from "../logo";
import Image from "next/image";
import userPlaceholder from "../../../../public/man.png";
import DarkModeToggle from "../darkModeToggle";

const DashboardNavbar: React.FC = () => {
  return (
    <nav className="h-[130px] p-7">
      <div className="w-full flex items-center justify-between dark:bg-primary-dark/50 bg-primary-dark/10 px-10 py-1 rounded-2xl">
        <div className="flex justify-center items-center gap-5">
          <div className="w-[100px] ">
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
          <DarkModeToggle />
          <Image
            src={userPlaceholder}
            alt="image placeholder"
            className="rounded-xl w-[70px]"
          />
        </div>
      </div>
    </nav>
  );
};
export default DashboardNavbar;
