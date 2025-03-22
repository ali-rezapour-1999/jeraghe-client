import React from "react";
import Logo from "../logo";
import Image from "next/image";
import userPlaceholder from "../../../../public/man.jpg";
import DarkModeToggle from "../darkModeToggle";

const DashbordNavbar: React.FC = () => {
  return (
    <nav className="min-h-[130px] p-7">
      <div className="w-full flex items-center justify-between dark:bg-primary-dark/50 bg-primary-dark/10 px-10 py-3 rounded-2xl">
        <div className="w-[100px] bg-primary-dark/30">
          <Logo />
        </div>
        <div className="flex items-center gap-7">
          <DarkModeToggle />
          <Image
            src={userPlaceholder}
            alt="image placeholder"
            className="rounded-xl w-[60px]"
          />
        </div>
      </div>
    </nav>
  );
};
export default DashbordNavbar;
