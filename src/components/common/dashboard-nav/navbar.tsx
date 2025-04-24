import React from "react";
import Logo from "../logo";
import { User } from "@/utils/type/authStateType";
import { Avatar, AvatarIcon } from "@heroui/react";
import DarkModeToggle from "../darkModeToggle";
import { Heading } from "@/components/ui/text";

const DashboardNavbar = ({ user }: { user: User }) => {
  return (
    <nav className="h-[130px] p-7">
      <div className="w-full flex items-center justify-between px-10 py-1">
        <div className="flex justify-center items-center gap-5">
          <div className="w-[60px] ">
            <Logo />
          </div>
          <div className="flex flex-col">
            <Heading as="h1" className="text-lg font-bold">
              خوش‌آمدی به جرقه!
            </Heading>
            <p className="text-sm hidden lg:block">
              مسیرت برای شغل و ساخت ایده‌ها شروع شده. 🚀
            </p>
          </div>
        </div>
        <div className="flex items-center gap-7">
          <div className="flex flex-col text-sm items-end text-primary dark:text-light">
            <span>{user?.email}</span>
            <span>{user?.username}</span>
          </div>
          {user?.image ? (
            <Avatar
              isBordered
              radius="sm"
              src={user?.image}
              className="object-cover"
              size="lg"
            />
          ) : (
            <Avatar
              radius="sm"
              classNames={{
                base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
                icon: "text-black/80",
              }}
              icon={<AvatarIcon />}
            />
          )}
          <DarkModeToggle />
        </div>
      </div>
    </nav>
  );
};
export default DashboardNavbar;
